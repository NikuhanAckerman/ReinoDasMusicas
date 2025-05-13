import React from 'react'
import '../css/SongCard.css'
import SongPlayer from "./SongPlayer.js"
import axios from 'axios';
import { BoxArrowUpRight, X} from 'react-bootstrap-icons';
import { getSongById } from '../functions/songApi.js';

export default function MySongs_SongCard( {mongoId, title, artist, image, previewUrl, deezerLink, onDelete} ) {

    function deleteSong(song, mongoId) {
        axios.delete(`/musicas/deletarMusica/${mongoId}`, {
                data: song
            })
            .then(response => {
                console.log("Música deletada com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao deletar música:", error);
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

            <button
                className="song-button"
                onClick={async () => {
                    try {
                      const song = await getSongById(mongoId);
                      deleteSong(song, mongoId);
                      onDelete();
                    } catch (err) {
                      console.error("Erro ao buscar ou deletar música:", err);
                    }
                }}
                > Deletar música <X />
            </button>
            
          </div>

        </div>
      </div>
    </div>
  );
}
