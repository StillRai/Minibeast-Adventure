import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MinibeastApp from './components/MinibeastApp';
import MathGame from './components/MathGame';
import QuizGame from './components/EnglishGame';
import PhonicsGame from './components/PhonicsGame'

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<MinibeastApp />} />
          <Route path="/math-game" element={<MathGame />} />
          <Route path="/quiz-game" element={<QuizGame />} />
          <Route path="/phonics-game" element={<PhonicsGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 
