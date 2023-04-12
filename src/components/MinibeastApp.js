import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StartScreen.css';
import MathGame from './MathGame';
import EnglishGame from './EnglishGame';
import PhonicsGame from './PhonicsGame';
import { IconButton, Modal, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import asaruMessageVideo from '../videos/Asaru_message.mp4';

function StartScreen({ onStartMath, onStartEnglish, onStartPhonics }) {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    return () => {
      context.close();
    };
  }, []);

  const playAudio = async (src) => {
    if (audioSource) {
      audioSource.stop();
    }

    if (!audioBuffer) {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(buffer);
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
    setAudioSource(source);
  };

  const stopAudio = () => {
    if (audioSource) {
      audioSource.stop();
      setAudioSource(null);
    }
  };

  const renderModal = () => {
    return (
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
<Box
  className="modal-content"
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minWidth: '60%',
    minHeight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>

          <IconButton
            onClick={() => setOpenModal(false)}
            color="inherit"
            aria-label="close modal"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2 id="modal-title">About the Game</h2>
          <div className="modal-description">
            <p id="modal-description">
              Welcome to the Minibeast Adventure! <br /> <br /> This is a fun game with lots of different activities about cute and tiny creatures called minibeasts. You can play Math, Phonics or Quiz games to learn more about these little friends. There are nice sounds in the game, so make sure your volume is just right. Have a great time playing!
            </p>
          </div>
          <video src={asaruMessageVideo} controls></video>
        </Box>
      </Modal>
    );
  };

  // ...
  return (
    <div className="StartScreen">
      <h1>Minibeast Games</h1>
      <IconButton
      onClick={() => setOpenModal(true)}
      color="primary"
      aria-label="open game info modal"
    >
      <InfoIcon />
    </IconButton>
      <button
        onClick={onStartMath}
      >
        Start Math Game
      </button>
      <button
        onClick={onStartEnglish}
      >
        Start Minibeast Quiz
      </button>
      <button
        onClick={onStartPhonics}
      >
        Start Minibeast Phonics
      </button>
      {renderModal()}
    </div>
  );
}

function MinibeastApp() {
  const [game, setGame] = useState('');

  const startMathGame = () => {
    setGame('math');
  };

  const startEnglishGame = () => {
    setGame('english');
  };

  const startPhonicsGame = () => {
    setGame('phonics');
  };

  return (
    <div className="App" >
      {game === '' && (
        <StartScreen
          onStartMath={startMathGame}
          onStartEnglish={startEnglishGame}
          onStartPhonics={startPhonicsGame}
        />
      )}
      {game === 'math' && <MathGame />}
      {game === 'english' && <EnglishGame />}
      {game === 'phonics' && <PhonicsGame />}
    </div>
  );
}

export default MinibeastApp;
