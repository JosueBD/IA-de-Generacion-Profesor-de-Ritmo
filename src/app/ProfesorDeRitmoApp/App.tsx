import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
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
      es: { translation: { title: 'Profesor de Ritmo', generate: 'Generar Ritmo', theory: 'Teoría', dictation: 'Dictado', instruments: 'Instrumentos', donate: 'Donar', connect: 'Conectar MetaMask', feedbackCorrect: '¡Correcto!', feedbackWrong: 'Inténtalo de nuevo', addNote: 'Añadir Nota', clearScore: 'Limpiar Partitura' } },
      he: { translation: { title: 'מורה לקצב', generate: 'ליצור קצב', theory: 'תיאוריה', dictation: 'דיקטציה', instruments: 'כלים', donate: 'לתרום', connect: 'חבר למטהמאסק', feedbackCorrect: 'נכון!', feedbackWrong: 'נסה שוב', addNote: 'להוסיף תו', clearScore: 'לנקות תוים' } },
      en: { translation: { title: 'Rhythm Professor', generate: 'Generate Rhythm', theory: 'Theory', dictation: 'Dictation', instruments: 'Instruments', donate: 'Donate', connect: 'Connect MetaMask', feedbackCorrect: 'Correct!', feedbackWrong: 'Try again', addNote: 'Add Note', clearScore: 'Clear Score' } },
      pt: { translation: { title: 'Professor de Ritmo', generate: 'Gerar Ritmo', theory: 'Teoria', dictation: 'Ditado', instruments: 'Instrumentos', donate: 'Doar', connect: 'Conectar MetaMask', feedbackCorrect: 'Correto!', feedbackWrong: 'Tente novamente', addNote: 'Adicionar Nota', clearScore: 'Limpar Partitura' } },
      fr: { translation: { title: 'Professeur de Rythme', generate: 'Générer Rythme', theory: 'Théorie', dictation: 'Dictée', instruments: 'Instruments', donate: 'Donner', connect: 'Connecter MetaMask', feedbackCorrect: 'Correct!', feedbackWrong: 'Réessayez', addNote: 'Ajouter Note', clearScore: 'Effacer Partition' } },
      it: { translation: { title: 'Professore di Ritmo', generate: 'Genera Ritmo', theory: 'Teoria', dictation: 'Dettato', instruments: 'Strumenti', donate: 'Dona', connect: 'Collega MetaMask', feedbackCorrect: 'Corretto!', feedbackWrong: 'Riprova', addNote: 'Aggiungi Nota', clearScore: 'Cancella Spartito' } },
      ja: { translation: { title: 'リズム教授', generate: 'リズムを生成', theory: '理論', dictation: 'dictation', instruments: '楽器', donate: '寄付', connect: 'MetaMaskに接続', feedbackCorrect: '正しい!', feedbackWrong: 'もう一度試してください', addNote: 'ノートを追加', clearScore: 'スコアをクリア' } },
      ko: { translation: { title: '리듬 교수', generate: '리듬 생성', theory: '이론', dictation: '독본', instruments: '악기', donate: '기부', connect: 'MetaMask 연결', feedbackCorrect: '정확함!', feedbackWrong: '다시 시도하세요', addNote: '노트 추가', clearScore: '악보 지우기' } },
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
  const webViewRef = useRef(null);

  const playRhythm = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    notes.forEach((note, index) => {
      synth.triggerAttackRelease(note.keys[0].split('/')[0], '4n', now + index * 0.5);
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
    const response = await fetch(`http://localhost:5000/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: i18n.language, tempo: 120, beats: 4 }),
    });
    const data = await response.json();
    setExercise(data[type] || data.message);
    setFeedback('');
    setUserAnswer('');
    if (type === 'generate-rhythm') {
      const initialNotes = ['c4/q', 'd4/q', 'e4/q', 'f4/q'].map(n => new Vex.Flow.StaveNote({ keys: [n], duration: 'q' }));
      setNotes(initialNotes);
      updateScore(initialNotes);
    }
  };

  const checkAnswer = async () => {
    const noteString = notes.map(n => n.keys[0].split('/')[0]).join(' ');
    const response = await fetch('http://localhost:5000/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: noteString, exercise }),
    });
    const data = await response.json();
    setFeedback(data.feedback);
  };

  const addNote = () => {
    const newNote = new Vex.Flow.StaveNote({ keys: ['c4'], duration: 'q' });
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    updateScore(newNotes);
  };

  const clearScore = () => {
    setNotes([]);
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
        const vexNotes = notes.map(n => new Vex.Flow.StaveNote({ keys: n.keys, duration: n.duration }));
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
        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Text style={styles.buttonText}>{i18n.t('addNote')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearScore}>
          <Text style={styles.buttonText}>{i18n.t('clearScore')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={playRhythm}>
          <Text style={styles.buttonText}>Reproducir</Text>
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
              </style>
            </head>
            <body>
              <div id="vexflow-canvas"></div>
            </body>
          </html>
        ` }}
        style={styles.webview}
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
});

export default App;
