import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Picker } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Tone from 'tone';
import { Vex } from 'vexflow';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ethers } from 'ethers';

// Configuración de i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: { title: 'Profesor de Ritmo', generate: 'Generar Ritmo', theory: 'Teoría', dictation: 'Dictado', instruments: 'Instrumentos', donate: 'Donar', connect: 'Conectar MetaMask', feedbackCorrect: '¡Correcto!', feedbackWrong: 'Inténtalo de nuevo', addNote: 'Añadir Nota', clearScore: 'Limpiar Partitura', play: 'Reproducir', selectNote: 'Selecciona Nota', selectDuration: 'Selecciona Duración', deleteNote: 'Eliminar Nota' } },
      he: { translation: { title: 'מורה לקצב', generate: 'ליצור קצב', theory: 'תיאוריה', dictation: 'דיקטציה', instruments: 'כלים', donate: 'לתרום', connect: 'חבר למטהמאסק', feedbackCorrect: 'נכון!', feedbackWrong: 'נסה שוב', addNote: 'להוסיף תו', clearScore: 'לנקות תוים', play: 'לנגן', selectNote: 'בחר תו', selectDuration: 'בחר משך', deleteNote: 'מחק תו' } },
      en: { translation: { title: 'Rhythm Professor', generate: 'Generate Rhythm', theory: 'Theory', dictation: 'Dictation', instruments: 'Instruments', donate: 'Donate', connect: 'Connect MetaMask', feedbackCorrect: 'Correct!', feedbackWrong: 'Try again', addNote: 'Add Note', clearScore: 'Clear Score', play: 'Play', selectNote: 'Select Note', selectDuration: 'Select Duration', deleteNote: 'Delete Note' } },
      pt: { translation: { title: 'Professor de Ritmo', generate: 'Gerar Ritmo', theory: 'Teoria', dictation: 'Ditado', instruments: 'Instrumentos', donate: 'Doar', connect: 'Conectar MetaMask', feedbackCorrect: 'Correto!', feedbackWrong: 'Tente novamente', addNote: 'Adicionar Nota', clearScore: 'Limpar Partitura', play: 'Tocar', selectNote: 'Selecionar Nota', selectDuration: 'Selecionar Duração', deleteNote: 'Excluir Nota' } },
      fr: { translation: { title: 'Professeur de Rythme', generate: 'Générer Rythme', theory: 'Théorie', dictation: 'Dictée', instruments: 'Instruments', donate: 'Donner', connect: 'Connecter MetaMask', feedbackCorrect: 'Correct!', feedbackWrong: 'Réessayez', addNote: 'Ajouter Note', clearScore: 'Effacer Partition', play: 'Jouer', selectNote: 'Sélectionner Note', selectDuration: 'Sélectionner Durée', deleteNote: 'Supprimer Note' } },
      it: { translation: { title: 'Professore di Ritmo', generate: 'Genera Ritmo', theory: 'Teoria', dictation: 'Dettato', instruments: 'Strumenti', donate: 'Dona', connect: 'Collega MetaMask', feedbackCorrect: 'Corretto!', feedbackWrong: 'Riprova', addNote: 'Aggiungi Nota', clearScore: 'Cancella Spartito', play: 'Suonare', selectNote: 'Seleziona Nota', selectDuration: 'Seleziona Durata', deleteNote: 'Elimina Nota' } },
      ja: { translation: { title: 'リズム教授', generate: 'リズムを生成', theory: '理論', dictation: 'dictation', instruments: '楽器', donate: '寄付', connect: 'MetaMaskに接続', feedbackCorrect: '正しい!', feedbackWrong: 'もう一度試してください', addNote: 'ノートを追加', clearScore: 'スコアをクリア', play: '再生', selectNote: 'ノートを選択', selectDuration: '長さを選択', deleteNote: 'ノートを削除' } },
      ko: { translation: { title: '리듬 교수', generate: '리듬 생성', theory: '이론', dictation: '독본', instruments: '악기', donate: '기부', connect: 'MetaMask 연결', feedbackCorrect: '정확함!', feedbackWrong: '다시 시도하세요', addNote: '노트 추가', clearScore: '악보 지우기', play: '재생', selectNote: '노트 선택', selectDuration: '길이 선택', deleteNote: '노트 삭제' } },
    },
    lng: 'es',
    fallbackLng: 'es',
  });

const App = () => {
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('0.01');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [exercise, setExercise] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState('c4');
  const [selectedDuration, setSelectedDuration] = useState('q');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const webViewRef = useRef(null);

  const noteOptions = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4'];
  const durationOptions = ['w', 'h', 'q', '8', '16'];

  const playRhythm = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    notes.forEach((note, index) => {
      const pitch = note.keys[0].split('/')[0];
      const duration = note.duration === 'w' ? 1 : note.duration === 'h' ? 0.5 : note.duration === 'q' ? 0.25 : note.duration === '8' ? 0.125 : 0.0625;
      synth.triggerAttackRelease(pitch, duration, now + index * 0.5);
    });
  };

  const connectWallet = async () => {
    try {
      const metamaskUrl = 'metamask://';
      if (!(await Linking.canOpenURL(metamaskUrl))) {
        const url = Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=io.metamask' : 'https://apps.apple.com/app/metamask/id1438144202';
        await Linking.openURL(url);
        setError(i18n.t('connect'));
        return;
      }
      await Linking.openURL(metamaskUrl);
      setConnected(true);
      setError(null);
    } catch (err) {
      setError(`${err.message}`);
    }
  };

  const donate = async () => {
    if (!connected) {
      setError(i18n.t('connect'));
      return;
    }
    if (!email) {
      setError(i18n.t('emailRequired'));
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: '0x2a0EeC585528C3FF59f957ca78acF3270163a6E8',
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(`${err.message}`);
    }
  };

  const generateExercise = async (type) => {
    const response = await fetch(`https://profesor-de-ritmo-backend.onrender.com/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: i18n.language, tempo: 120, beats: 4 }),
    });
    const data = await response.json();
    setExercise(data[type] || data.message);
    setFeedback('');
    setUserAnswer('');
    if (type === 'generate-rhythm') {
      const initialNotes = ['c4/q', 'd4/q', 'e4/q', 'f4/q'].map(n => new Vex.Flow.StaveNote({ keys: [n.split('/')[0]], duration: n.split('/')[1] }));
      setNotes(initialNotes);
      updateScore(initialNotes);
    }
  };

  const checkAnswer = async () => {
    const noteString = notes.map(n => n.keys[0]).join(' ');
    const response = await fetch('https://profesor-de-ritmo-backend.onrender.com/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: noteString, exercise }),
    });
    const data = await response.json();
    setFeedback(data.feedback);
  };

  const addNote = () => {
    const newNote = new Vex.Flow.StaveNote({ keys: [selectedNote], duration: selectedDuration });
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    updateScore(newNotes);
  };

  const deleteNote = () => {
    if (selectedNoteIndex !== null) {
      const newNotes = notes.filter((_, index) => index !== selectedNoteIndex);
      setNotes(newNotes);
      setSelectedNoteIndex(null);
      updateScore(newNotes);
    }
  };

  const clearScore = () => {
    setNotes([]);
    setSelectedNoteIndex(null);
    updateScore([]);
  };

  const updateScore = (notesToRender) => {
    if (webViewRef.current) {
      const script = `
        const renderer = new Vex.Flow.Renderer(document.getElementById('vexflow-canvas'), Vex.Flow.Renderer.Backends.SVG);
        const context = renderer.getContext();
        renderer.resize(400, 200);
        context.clear();
        const stave = new Vex.Flow.Stave(10, 10, 380);
        stave.addClef('treble').setContext(context).draw();
        const notes = ${JSON.stringify(notesToRender.map(n => ({ keys: n.keys, duration: n.duration })))};
        const vexNotes = notes.map((n, index) => {
          const note = new Vex.Flow.StaveNote({ keys: n.keys, duration: n.duration });
          if (index === ${selectedNoteIndex}) {
            note.setStyle({ fillStyle: 'red', strokeStyle: 'red' });
          }
          return note;
        });
        if (vexNotes.length > 0) {
          const voice = new Vex.Flow.Voice({ num_beats: vexNotes.length, beat_value: 4 });
          voice.addTickables(vexNotes);
          new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 380);
          voice.draw(context, stave);
        }
      `;
      webViewRef.current.injectJavaScript(script);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('title')}</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => generateExercise('generate-rhythm')}>
          <Text style={styles.buttonText}>{i18n.t('generate')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => generateExercise('get-theory')}>
          <Text style={styles.buttonText}>{i18n.t('theory')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => generateExercise('generate-melodic-dictation')}>
          <Text style={styles.buttonText}>{i18n.t('dictation')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => generateExercise('identify-instruments')}>
          <Text style={styles.buttonText}>{i18n.t('instruments')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => generateExercise('generate-harmony')}>
          <Text style={styles.buttonText}>Armonía</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => generateExercise('appreciate-music')}>
          <Text style={styles.buttonText}>Apreciación</Text>
        </TouchableOpacity>
        <View style={styles.noteSelector}>
          <Picker
            selectedValue={selectedNote}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedNote(itemValue)}
          >
            {noteOptions.map(note => (
              <Picker.Item key={note} label={note.toUpperCase()} value={note} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedDuration}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedDuration(itemValue)}
          >
            <Picker.Item label="Redonda" value="w" />
            <Picker.Item label="Blanca" value="h" />
            <Picker.Item label="Negra" value="q" />
            <Picker.Item label="Corchea" value="8" />
            <Picker.Item label="Semicorchea" value="16" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Text style={styles.buttonText}>{i18n.t('addNote')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteNote}>
          <Text style={styles.buttonText}>{i18n.t('deleteNote')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearScore}>
          <Text style={styles.buttonText}>{i18n.t('clearScore')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={playRhythm}>
          <Text style={styles.buttonText}>{i18n.t('play')}</Text>
        </TouchableOpacity>
      </View>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: `
          <!DOCTYPE html>
          <html>
            <head>
              <script src="https://unpkg.com/vexflow@4.2.3/build/vexflow.js"></script>
              <style>
                #vexflow-canvas { border: 1px solid #000; width: 400px; height: 200px; }
                #vexflow-canvas svg { cursor: pointer; }
              </style>
            </head>
            <body>
              <div id="vexflow-canvas"></div>
              <script>
                document.getElementById('vexflow-canvas').addEventListener('click', (e) => {
                  const notes = ${JSON.stringify(notes.map(n => ({ keys: n.keys, duration: n.duration })))};
                  const x = e.offsetX;
                  const noteWidth = 380 / (notes.length || 1);
                  const index = Math.floor(x / noteWidth);
                  window.ReactNativeWebView.postMessage(index.toString());
                });
              </script>
            </body>
          </html>
        ` }}
        style={styles.webview}
        onMessage={(event) => setSelectedNoteIndex(parseInt(event.nativeEvent.data))}
      />
      {exercise && (
        <View>
          <Text>{exercise}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('answer')}
            value={userAnswer}
            onChangeText={setUserAnswer}
          />
          <TouchableOpacity style={styles.button} onPress={checkAnswer}>
            <Text style={styles.buttonText}>{i18n.t('submit')}</Text>
          </TouchableOpacity>
          {feedback && <Text style={styles.feedback}>{feedback}</Text>}
        </View>
      )}
      <Text>{i18n.t('donate')}</Text>
      <TextInput style={styles.input} placeholder="tu@correo.com" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Monto (MATIC)" value={amount} onChangeText={setAmount} />
      {!connected ? (
        <TouchableOpacity style={styles.button} onPress={connectWallet}>
          <Text style={styles.buttonText}>{i18n.t('connect')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={donate}>
          <Text style={styles.buttonText}>{i18n.t('donate')}</Text>
        </TouchableOpacity>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{i18n.t('success')}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, margin: 5 },
  buttonText: { color: '#fff', fontSize: 16 },
  input: { width: '80%', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', marginTop: 10 },
  feedback: { marginTop: 10, color: 'blue' },
  webview: { width: 400, height: 200, margin: 10 },
  noteSelector: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
  picker: { height: 50, width: 150 },
});

export default App;
