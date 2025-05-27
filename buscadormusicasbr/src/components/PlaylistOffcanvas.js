import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getMySongs } from '../functions/songApi.js';
import MySongs_SongCard from './MySongs_SongCard.js';
import { useNotification } from './NotificationContext.js';

export default function PlaylistOffcanvas({ onPlaylistCreated }) {
    
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const { addNotification } = useNotification();

  const fetchSongs = async () => {
    try {
      const response = await getMySongs();
      setSongs(response);
    } catch (err) {
      addNotification("Erro", "Erro ao buscar músicas para a playlist.");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const toggleSongSelection = (songId) => {
    setSelectedSongs(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const createNewPlaylist = async () => {
  if (!playlistName.trim()) {
    addNotification("Erro", "Erro: Dê um nome para sua playlist!");
    return;
  }

  if (selectedSongs.length === 0) {
    addNotification("Erro", "Erro: Selecione pelo menos uma música!");
    return;
  }

  try {
    await axios.post("/playlists/minhasPlaylists/criarPlaylist", {
      title: playlistName,
      listOfSongIds: selectedSongs
    });
    addNotification("Sucesso", "Playlist criada!");
    setPlaylistName("");
    setSelectedSongs([]);
    onPlaylistCreated();
  } catch (error) {
    console.error("Erro ao criar playlist", error);
    const errorMsg = error.response.data || "Erro ao criar playlist";
    addNotification("Erro", errorMsg);
  }
};


  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="playlistOffCanvas" aria-labelledby="playlistOffCanvas" style={{width: "550px"}}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Criar playlist</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="mb-3">
          <label className="form-label">Nome da playlist</label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite o nome da playlist"
            value={playlistName}
            required
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <h3>Músicas</h3>
          {songs.map((song) => (
            
            <div key={song.id}>
              <MySongs_SongCard
                mongoId={song.id}
                title={song.title}
                artist={song.artist}
                image={song.imageUrl}
                previewUrl={song.previewUrl}
                deezerId={song.deezerId}
                deezerLink={song.deezerLink}
                onDelete={fetchSongs}
              />
             <div className="form-check form-switch custom-checkbox mb-2 d-flex align-items-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`check-${song.id}`}
                    checked={selectedSongs.includes(song.id)}
                    onChange={() => toggleSongSelection(song.id)}
                />
                <label className="form-check-label ms-2 fw-semibold" htmlFor={`check-${song.id}`}>
                    Selecionar
                </label>
             </div>
            </div>
          ))}
        </div>

        <button
            className="song-button"
            onClick={createNewPlaylist}
            >
            Criar playlist
        </button>

      </div>
    </div>
  );
}
