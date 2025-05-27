import React from 'react';
import { BoxArrowUpRight, X } from 'react-bootstrap-icons';
import SongPlayer from './SongPlayer.js';
import { useNotification } from './NotificationContext.js';
import axios from 'axios';

export default function PlaylistSongCard({
  songId,
  playlistId,
  title,
  artist,
  image,
  previewUrl,
  deezerLink,
  onDelete
}) {
  const { addNotification } = useNotification();

  const deleteSongFromPlaylist = async () => {
    try {
      await axios.post(`/playlists/minhasPlaylists/${playlistId}/removerMusica`, null, {
        params: { songId }
      });
      addNotification('Sucesso', 'Música removida da playlist com sucesso!');
      onDelete();
    } catch (error) {
      addNotification('Erro', error.response?.data || 'Erro ao remover música.');
    }
  };

  return (
    <div className="text-center">
      <div className="card songCard text-center">
        <div className="card-body d-flex align-items-start">
          <img className="music-thumbnail" src={image} alt={`${title} cover`} />

          <div className="d-flex flex-column justify-content-start music-info-player-container">
            <h4 className="card-title music-title text-start">
              {title}{' '}
              <a href={deezerLink} target="_blank" rel="noopener noreferrer" className="deezer-link-btn">
                <BoxArrowUpRight />
              </a>
            </h4>
            <h6 className="card-title artist-title text-start">{artist}</h6>
            <SongPlayer audioSrc={previewUrl} />

            <button className="song-button" onClick={deleteSongFromPlaylist}>
              Remover música <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
