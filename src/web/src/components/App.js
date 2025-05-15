import React, { useState } from 'react';
import './App.css';

function App() {
  const [rhythm, setRhythm] = useState('');
  const [language, setLanguage] = useState('es');

  const languages = {
    es: { generate: 'Generar Ritmo', title: 'Profesor de Ritmo' },
    en: { generate: 'Generate Rhythm', title: 'Rhythm Professor' },
    fr: { generate: 'Générer Rythme', title: 'Professeur de Rythme' },
  };

  const generateRhythm = () => {
    // Simulación: en el futuro, llamará al backend o MCP
    setRhythm(`Ritmo a 120 BPM: [ta ta ta ta]`);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>{languages[language].title}</h1>
        <p>Escuela de música virtual con IA generativa</p>
      </div>
      <div className="lang-selector">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
      <button className="rhythm-button" onClick={generateRhythm}>
        {languages[language].generate}
      </button>
      {rhythm && (
        <div className="score">
          <h3>Ritmo Generado:</h3>
          <p>{rhythm}</p>
        </div>
      )}
    </div>
  );
}

export default App;
