import React, { useState } from 'react'
import '../css/SongCard.css'
import SongPlayer from "./SongPlayer.js"
import axios from 'axios';
import { BoxArrowUpRight, PlusCircleFill} from 'react-bootstrap-icons';
import { useNotification } from './NotificationContext';

export default function SongCard( {title, artist, image, previewUrl, deezerId, deezerLink} ) {
    const { addNotification } = useNotification();

    function addSong(title, artist, imageUrl, previewUrl, deezerId, deezerLink) {
      axios.post('/musicas/adicionarMusica', {
        title,
        artist,
        imageUrl,
        previewUrl,
        deezerId,
        deezerLink
      })  
      .then(response => {
        addNotification("Sucesso", "Música adicionada com sucesso!");

        console.log("Música adicionada com sucesso!");
      })
      .catch(error => {
        addNotification("Erro", error.response.data || "Erro indeterminado");
    
        console.error(error.response.data);
      });
    }

  return (
    <div className="text-center">
      <div className="card songCard">

        <div className="card-body d-flex align-items-start">
          <span>
            <img className="music-thumbnail" src={image} alt={`${title} cover`} />
          </span>

          <div className="d-flex flex-column justify-content-start music-info-player-container">
            
            <h4 className="card-title music-title text-start">{title} <a href={deezerLink} target="_blank" rel="noopener noreferrer" className="deezer-link-btn"><BoxArrowUpRight/></a></h4>
            
            <h6 className="card-title artist-title text-start">{artist}</h6>
            
            <SongPlayer audioSrc={previewUrl} />

            <button className="song-button" onClick={() => addSong(title, artist, image, previewUrl, deezerId, deezerLink)}>Adicionar música <PlusCircleFill/></button>
            
          </div>

        </div>
      </div>
    </div>
  );
}
