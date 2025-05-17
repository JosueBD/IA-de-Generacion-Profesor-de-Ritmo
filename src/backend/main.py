from flask import Flask, request, jsonify
from flask_babel import Babel, _
import music21
import librosa
import numpy as np
import magenta
import tensorflow as tf
from magenta.models.drums_rnn import drums_rnn_sequence_generator
import os
import subprocess
import pandas as pd

app = Flask(__name__)

# Configuración de Flask-Babel para soporte multilingüe
app.config['BABEL_DEFAULT_LOCALE'] = 'es'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
babel = Babel(app)

@babel.localeselector
def get_locale():
    lang = request.json.get('lang', 'es') if request.is_json else 'es'
    supported_langs = ['es', 'he', 'en', 'pt', 'fr', 'it', 'ja', 'ko']
    return lang if lang in supported_langs else 'es'

# Nota: La carpeta models/ contiene subcarpetas drumm_rnn_model/ e instrument_classifier/
# con scripts para descargar los modelos dinámicamente.
# Asegurarse de que el modelo de Magenta exista
magenta_model_path = 'models/drumm_rnn_model/drumm_rnn.mag'
if not os.path.exists(magenta_model_path):
    subprocess.run(['bash', 'models/drumm_rnn_model/download_model.sh'])

# Asegurarse de que YAMNet exista
yamnet_model_path = 'models/instrument_classifier/model'
if not os.path.exists(yamnet_model_path):
    subprocess.run(['python', 'models/instrument_classifier/download_yamnet.py'])

# Asegurarse de que los archivos de datos existan
midi_file_path = 'data/sample_midi.mid'
wav_file_path = 'data/sample.wav'
if not os.path.exists(midi_file_path) or not os.path.exists(wav_file_path):
    subprocess.run(['bash', 'data/download_data.sh'])

# Cargar modelo de Magenta para generación de ritmos
bundle = magenta.music.sequence_generator_bundle.read_bundle_file('models/drumm_rnn_model/drumm_rnn.mag')
generator = drums_rnn_sequence_generator.DrumsRnnSequenceGenerator()
generator.initialize()

# Cargar modelo de clasificación de instrumentos (YAMNet)
instrument_classifier = tf.saved_model.load('models/instrument_classifier/model')

# Cargar las etiquetas de YAMNet
class_map = pd.read_csv('models/instrument_classifier/yamnet_class_map.csv')
class_names = class_map['display_name'].tolist()

# Base de datos de obras para apreciación musical
WORKS = {
    "beethoven_symphony_5": {
        "title": "Sinfonía No. 5",
        "composer": "Ludwig van Beethoven",
        "year": 1808,
        "analysis": "Obra en do menor con un motivo rítmico icónico (ta-ta-ta-TA). Usa una estructura de sonata con cuatro movimientos."
    },
    "mozart_requiem": {
        "title": "Requiem en re menor, K. 626",
        "composer": "Wolfgang Amadeus Mozart",
        "year": 1791,
        "analysis": "Obra coral inacabada, con un Lacrimosa emotivo. Estructura litúrgica con secciones como Introitus y Dies Irae."
    },
    "chopin_nocturne": {
        "title": "Nocturne en mi bemol mayor, Op. 9 No. 2",
        "composer": "Frédéric Chopin",
        "year": 1832,
        "analysis": "Pieza para piano solo, con un estilo melódico lírico y armonías románticas. Forma ternaria (ABA)."
    }
}

# Endpoint para generar ritmos
@app.route('/generate-rhythm', methods=['POST'])
def generate_rhythm():
    data = request.json
    tempo = data.get('tempo', 120)
    beats = data.get('beats', 4)
    style = data.get('style', 'classical')

    drum_track = generator.generate({}, seconds=beats / (tempo / 60))
    stream = music21.stream.Stream()
    stream.append(music21.tempo.MetronomeMark(number=tempo))
    for event in drum_track.events:
        if event.note:
            stream.append(music21.note.Note('C4', quarterLength=event.duration))

    midi = stream.write('midi', fp='temp.mid')
    return jsonify({
        'rhythm': _(f"Ritmo a {tempo} BPM con {beats} pulsos"),
        'midi': midi,
        'correct_answer': 'ta ' * beats if style == 'classical' else 'ta-ka ta ' * (beats // 2)
    })

# Endpoint para generar armonías
@app.route('/generate-harmony', methods=['POST'])
def generate_harmony():
    data = request.json
    key = data.get('key', 'C')
    style = data.get('style', 'basic')
    chords = []

    if style == "basic":
        chords = ['I', 'IV', 'V', 'I']  # Progresión básica I-IV-V-I
    elif style == "jazz":
        # Progresión ii-V-I
        roman = ['ii', 'V', 'I']
        key_obj = music21.key.Key(key)
        for r in roman:
            chord = music21.roman.RomanNumeral(r, key_obj)
            chords.append(chord.figure)
    elif style == "modulation":
        # Progresión con modulación (I-IV-V en tonalidad inicial, luego V-I en nueva tonalidad)
        key_obj = music21.key.Key(key)
        new_key = key_obj.getRelativeMinor().tonicPitchNameWithCase
        chords = [
            music21.roman.RomanNumeral('I', key_obj).figure,
            music21.roman.RomanNumeral('IV', key_obj).figure,
            music21.roman.RomanNumeral('V', key_obj).figure,
            music21.roman.RomanNumeral('V', new_key).figure,
            music21.roman.RomanNumeral('I', new_key).figure
        ]

    return jsonify({
        'key': key,
        'chords': chords,
        'message': _(f"Progresión armónica en {key} ({style})")
    })

# Endpoint para identificar instrumentos
@app.route('/identify-instruments', methods=['POST'])
def identify_instruments():
    data = request.json
    audio_file = data.get('audio_file', 'data/sample.wav')
    y, sr = librosa.load(audio_file)
    # Ajustar el audio para YAMNet (mono, 16kHz)
    y = librosa.resample(y, orig_sr=sr, target_sr=16000)
    # YAMNet espera una forma específica
    waveform = y[None, :]
    scores, _, _ = instrument_classifier(waveform)
    prediction = np.argmax(scores, axis=1)[0]
    instrument = class_names[prediction]
    return jsonify({
        'instruments': [instrument],
        'count': 1,
        'message': _(f"Se detectó 1 instrumento: {instrument}"),
        'correct_answer': instrument
    })

# Endpoint para apreciación musical
@app.route('/appreciate-music', methods=['POST'])
def appreciate_music():
    data = request.json
    work_id = data.get('work_id', 'beethoven_symphony_5')
    if work_id not in WORKS:
        return jsonify({'error': 'Obra no encontrada'}), 404
    work = WORKS[work_id]
    return jsonify({
        'title': work['title'],
        'composer': work['composer'],
        'year': work['year'],
        'analysis': work['analysis'],
        'message': _(f"Análisis de {work['title']} por {work['composer']}")
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
