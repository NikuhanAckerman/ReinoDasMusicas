import React from 'react';
import '../css/SongPlayer.css';

export default function SongPlayer({ audioSrc }) {
  return (
    <div className="player-container">
      <audio controls src={audioSrc} className="audio-element" />
    </div>
  );
}