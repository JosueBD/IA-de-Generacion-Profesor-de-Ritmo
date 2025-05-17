import React, { useState, useEffect } from 'react';
import { Vex } from 'vexflow';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import './App.css';

// Configuración de i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: { title: 'Profesor de Ritmo', generate: 'Generar Ritmo', theory: 'Teoría', dictation: 'Dictado', instruments: 'Instrumentos', submit: 'Enviar', score: 'Puntuación: ', offline: 'Descargar para offline', community: 'Foro en X', addNote: 'Añadir Nota', clearScore: 'Limpiar Partitura', play: 'Reproducir', donate: 'Donar con PayPal', selectNote: 'Selecciona Nota', selectDuration: 'Selecciona Duración', deleteNote: 'Eliminar Nota' } },
      he: { translation: { title: 'מורה לקצב', generate: 'ליצור קצב', theory: 'תיאוריה', dictation: 'דיקטציה', instruments: 'כלים', submit: 'שלח', score: 'ניקוד: ', offline: 'להוריד לאופליין', community: 'פורום ב-X', addNote: 'להוסיף תו', clearScore: 'לנקות תוים', play: 'לנגן', donate: 'תרום עם PayPal', selectNote: 'בחר תו', selectDuration: 'בחר משך', deleteNote: 'מחק תו' } },
      en: { translation: { title: 'Rhythm Professor', generate: 'Generate Rhythm', theory: 'Theory', dictation: 'Dictation', instruments: 'Instruments', submit: 'Submit', score: 'Score: ', offline: 'Download for Offline', community: 'Forum on X', addNote: 'Add Note', clearScore: 'Clear Score', play: 'Play', donate: 'Donate with PayPal', selectNote: 'Select Note', selectDuration: 'Select Duration', deleteNote: 'Delete Note' } },
      pt: { translation: { title: 'Professor de Ritmo', generate: 'Gerar Ritmo', theory: 'Teoria', dictation: 'Ditado', instruments: 'Instrumentos', submit: 'Enviar', score: 'Pontuação: ', offline: 'Baixar para Offline', community: 'Fórum no X', addNote: 'Adicionar Nota', clearScore: 'Limpar Partitura', play: 'Tocar', donate: 'Doar com PayPal', selectNote: 'Selecionar Nota', selectDuration: 'Selecionar Duração', deleteNote: 'Excluir Nota' } },
      fr: { translation: { title: 'Professeur de Rythme', generate: 'Générer Rythme', theory: 'Théorie', dictation: 'Dictée', instruments: 'Instruments', submit: 'Envoyer', score: 'Score: ', offline: 'Télécharger pour Offline', community: 'Forum sur X', addNote: 'Ajouter Note', clearScore: 'Effacer Partition', play: 'Jouer', donate: 'Donner avec PayPal', selectNote: 'Sélectionner Note', selectDuration: 'Sélectionner Durée', deleteNote: 'Supprimer Note' } },
      it: { translation: { title: 'Professore di Ritmo', generate: 'Genera Ritmo', theory: 'Teoria', dictation: 'Dettato', instruments: 'Strumenti', submit: 'Invia', score: 'Punteggio: ', offline: 'Scarica per Offline', community: 'Forum su X', addNote: 'Aggiungi Nota', clearScore: 'Cancella Spartito', play: 'Suonare', donate: 'Dona con PayPal', selectNote: 'Seleziona Nota', selectDuration: 'Seleziona Durata', deleteNote: 'Elimina Nota' } },
      ja: { translation: { title: 'リズム教授', generate: 'リズムを生成', theory: '理論', dictation: 'dictation', instruments: '楽器', submit: '送信', score: 'スコア: ', offline: 'オフライン用にダウンロード', community: 'Xのフォーラム', addNote: 'ノートを追加', clearScore: 'スコアをクリア', play: '再生', donate: 'PayPalで寄付', selectNote: 'ノートを選択', selectDuration: '長さを選択', deleteNote: 'ノートを削除' } },
      ko: { translation: { title: '리듬 교수', generate: '리듬 생성', theory: '이론', dictation: '독본', instruments: '악기', submit: '제출', score: '점수: ', offline: '오프라인용 다운로드', community: 'X 포럼', addNote: '노트 추가', clearScore: '악보 지우기', play: '재생', donate: 'PayPal로 기부', selectNote: '노트 선택', selectDuration: '길이 선택', deleteNote: '노트 삭제' } },
    },
    lng: 'es',
    fallbackLng: 'es',
  });

const App = () => {
  const [exercise, setExercise] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [vf, setVf] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState('c4');
  const [selectedDuration, setSelectedDuration] = useState('q');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  const noteOptions = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4'];
  const durationOptions = ['w', 'h', 'q', '8', '16'];

  useEffect(() => {
    const renderer = new Vex.Flow.Renderer(document.getElementById('vexflow-canvas'), Vex.Flow.Renderer.Backends.SVG);
    const context = renderer.getContext();
    setVf({ renderer, context });
    renderScore(notes);
  }, [notes, selectedNoteIndex]);

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
    const initialNotes = ['c4/q', 'd4/q', 'e4/q', 'f4/q'].map(n => ({ keys: [n.split('/')[0]], duration: n.split('/')[1] }));
    setNotes(initialNotes);
  };

  const renderScore = (notesToRender) => {
    if (!vf) return;
    const { renderer, context } = vf;
    renderer.resize(400, 200);
    context.clear();
    const stave = new Vex.Flow.Stave(10, 10, 380);
    stave.addClef('treble').setContext(context).draw();
    const vexNotes = notesToRender.map((n, index) => {
      const note = new Vex.Flow.StaveNote({ keys: n.keys, duration: n.duration });
      if (index === selectedNoteIndex) {
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
  };

  const addNote = () => {
    const newNote = { keys: [selectedNote], duration: selectedDuration };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = () => {
    if (selectedNoteIndex !== null) {
      const newNotes = notes.filter((_, index) => index !== selectedNoteIndex);
      setNotes(newNotes);
      setSelectedNoteIndex(null);
    }
  };

  const clearScore = () => {
    setNotes([]);
    setSelectedNoteIndex(null);
  };

  const playScore = () => {
    const audio = new AudioContext();
    notes.forEach((note, index) => {
      const freq = { c4: 261.63, d4: 293.66, e4: 329.63, f4: 349.23, g4: 392.00, a4: 440.00, b4: 493.88 }[note.keys[0]];
      const duration = note.duration === 'w' ? 1 : note.duration === 'h' ? 0.5 : note.duration === 'q' ? 0.25 : note.duration === '8' ? 0.125 : 0.0625;
      const oscillator = audio.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audio.currentTime + index * 0.5);
      oscillator.connect(audio.destination);
      oscillator.start(audio.currentTime + index * 0.5);
      oscillator.stop(audio.currentTime + index * 0.5 + duration);
    });
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
    if (data.correct) setScore(score + 10);
  };

  const downloadOffline = () => {
    const blob = new Blob([JSON.stringify({ exercise, notes })], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exercise.json';
    a.click();
  };

  const handleCanvasClick = (e) => {
    const noteWidth = 380 / (notes.length || 1);
    const index = Math.floor(e.nativeX / noteWidth);
    setSelectedNoteIndex(index < notes.length ? index : null);
  };

  return (
    <div className="app">
      <h1>{i18n.t('title')}</h1>
      <div>
        <button onClick={() => generateExercise('generate-rhythm')}>{i18n.t('generate')}</button>
        <button onClick={() => generateExercise('get-theory')}>{i18n.t('theory')}</button>
        <button onClick={() => generateExercise('generate-melodic-dictation')}>{i18n.t('dictation')}</button>
        <button onClick={() => generateExercise('identify-instruments')}>{i18n.t('instruments')}</button>
        <button onClick={() => generateExercise('generate-harmony')}>Armonía</button>
        <button onClick={() => generateExercise('appreciate-music')}>Apreciación</button>
        <div>
          <select value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)}>
            {noteOptions.map(note => (
              <option key={note} value={note}>{note.toUpperCase()}</option>
            ))}
          </select>
          <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
            <option value="w">Redonda</option>
            <option value="h">Blanca</option>
            <option value="q">Negra</option>
            <option value="8">Corchea</option>
            <option value="16">Semicorchea</option>
          </select>
        </div>
        <button onClick={addNote}>{i18n.t('addNote')}</button>
        <button onClick={deleteNote}>{i18n.t('deleteNote')}</button>
        <button onClick={clearScore}>{i18n.t('clearScore')}</button>
        <button onClick={playScore}>{i18n.t('play')}</button>
        <button onClick={downloadOffline}>{i18n.t('offline')}</button>
        <a href="https://x.com/ProfesorRitmo" target="_blank">{i18n.t('community')}</a>
        <a href="https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID" target="_blank">{i18n.t('donate')}</a>
      </div>
      <div id="vexflow-canvas" style={{ border: '1px solid #000', margin: '10px 0', cursor: 'pointer' }} onClick={handleCanvasClick}></div>
      {exercise && (
        <div>
          <input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
          <button onClick={checkAnswer}>{i18n.t('submit')}</button>
          <p>{feedback}</p>
          <p>{i18n.t('score')}{score}</p>
        </div>
      )}
    </div>
  );
};

export default App;
