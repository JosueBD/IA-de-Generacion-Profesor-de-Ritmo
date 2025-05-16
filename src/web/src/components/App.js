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
      es: { translation: { title: 'Profesor de Ritmo', generate: 'Generar Ritmo', theory: 'Teoría', dictation: 'Dictado', instruments: 'Instrumentos', submit: 'Enviar', score: 'Puntuación: ', offline: 'Descargar para offline', community: 'Foro en X' } },
      he: { translation: { title: 'מורה לקצב', generate: 'ליצור קצב', theory: 'תיאוריה', dictation: 'דיקטציה', instruments: 'כלים', submit: 'שלח', score: 'ניקוד: ', offline: 'להוריד לאופליין', community: 'פורום ב-X' } },
      en: { translation: { title: 'Rhythm Professor', generate: 'Generate Rhythm', theory: 'Theory', dictation: 'Dictation', instruments: 'Instruments', submit: 'Submit', score: 'Score: ', offline: 'Download for Offline', community: 'Forum on X' } },
      pt: { translation: { title: 'Professor de Ritmo', generate: 'Gerar Ritmo', theory: 'Teoria', dictation: 'Ditado', instruments: 'Instrumentos', submit: 'Enviar', score: 'Pontuação: ', offline: 'Baixar para Offline', community: 'Fórum no X' } },
      fr: { translation: { title: 'Professeur de Rythme', generate: 'Générer Rythme', theory: 'Théorie', dictation: 'Dictée', instruments: 'Instruments', submit: 'Envoyer', score: 'Score: ', offline: 'Télécharger pour Offline', community: 'Forum sur X' } },
      it: { translation: { title: 'Professore di Ritmo', generate: 'Genera Ritmo', theory: 'Teoria', dictation: 'Dettato', instruments: 'Strumenti', submit: 'Invia', score: 'Punteggio: ', offline: 'Scarica per Offline', community: 'Forum su X' } },
      ja: { translation: { title: 'リズム教授', generate: 'リズムを生成', theory: '理論', dictation: ' dictation', instruments: '楽器', submit: '送信', score: 'スコア: ', offline: 'オフライン用にダウンロード', community: 'Xのフォーラム' } },
      ko: { translation: { title: '리듬 교수', generate: '리듬 생성', theory: '이론', dictation: '독본', instruments: '악기', submit: '제출', score: '점수: ', offline: '오프라인용 다운로드', community: 'X 포럼' } },
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

  useEffect(() => {
    const renderer = new Vex.Flow.Renderer(document.getElementById('vexflow-canvas'), Vex.Flow.Renderer.Backends.SVG);
    const context = renderer.getContext();
    setVf({ renderer, context });
  }, []);

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
    renderScore(data);
  };

  const renderScore = (data) => {
    if (!vf) return;
    const { renderer, context } = vf;
    renderer.resize(400, 200);
    context.clear();
    const stave = new Vex.Flow.Stave(10, 10, 380);
    stave.addClef('treble').setContext(context).draw();
    const notes = ['c4/q', 'd4/q', 'e4/q', 'f4/q'].map(n => new Vex.Flow.StaveNote({ keys: [n], duration: 'q' }));
    const voice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);
    new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 380);
    voice.draw(context, stave);
  };

  const checkAnswer = async () => {
    const response = await fetch('http://localhost:5000/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: userAnswer, exercise: exercise }),
    });
    const data = await response.json();
    setFeedback(data.feedback);
    if (data.correct) setScore(score + 10);
  };

  const downloadOffline = () => {
    const blob = new Blob([JSON.stringify({ exercise })], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exercise.json';
    a.click();
  };

  return (
    <div className="app">
      <h1>{i18n.t('title')}</h1>
      <div>
        <button onClick={() => generateExercise('generate-rhythm')}>{i18n.t('generate')}</button>
        <button onClick={() => generateExercise('get-theory')}>{i18n.t('theory')}</button>
        <button onClick={() => generateExercise('generate-melodic-dictation')}>{i18n.t('dictation')}</button>
        <button onClick={() => generateExercise('identify-instruments')}>{i18n.t('instruments')}</button>
        <button onClick={downloadOffline}>{i18n.t('offline')}</button>
        <a href="https://x.com/ProfesorRitmo" target="_blank">{i18n.t('community')}</a>
      </div>
      <div id="vexflow-canvas" style={{ border: '1px solid #000', margin: '10px 0' }}></div>
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
