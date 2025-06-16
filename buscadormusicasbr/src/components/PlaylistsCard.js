import React, { useEffect, useState } from 'react';
import { ArrowDown, Pencil, X } from 'react-bootstrap-icons';
import PlaylistSongCard from './PlaylistSongCard.js';
import { getPlaylistById, getPlaylistSongs } from '../functions/songApi.js';
import { useNotification } from './NotificationContext.js';
import axios from 'axios';
import { getMySongs } from '../functions/songApi.js';

export default function PlaylistsCard({ mongoId, title, onDelete }) {
  const { addNotification } = useNotification();
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [displayedTitle, setDisplayedTitle] = useState(title);

  const fetchPlaylistSongs = async () => {
    try {
      const songs = await getPlaylistSongs(mongoId);
      setPlaylistSongs(songs);
    } catch {
      addNotification('Erro', 'Erro ao carregar músicas da playlist.');
    }
  };

  const fetchAllSongs = async () => {
    try {
      const response = await getMySongs();
      console.log(response)
      setAllSongs(response);
    } catch {
      addNotification('Erro', 'Erro ao buscar suas músicas.');
    }
  };

  useEffect(() => {
    if (isCollapsed) fetchPlaylistSongs();
  }, [isCollapsed]);

  const deletePlaylist = async () => {
    try {
      const playlist = await getPlaylistById(mongoId);
      await axios.delete(`/playlists/deletarPlaylist/${mongoId}`, { data: playlist });
      addNotification('Sucesso', 'Playlist deletada!');
      onDelete();
    } catch (err) {
      addNotification('Erro', err.response?.data || 'Erro ao deletar playlist.');
    }
  };

  const updatePlaylistName = async () => {
    try {
      await axios.put(`/playlists/minhasPlaylists/${mongoId}/atualizarTitulo`, null, {
        params: { newTitle }
      });
      addNotification('Sucesso', 'Título da playlist atualizado!');
      setDisplayedTitle(newTitle);
      setIsEditingTitle(false);
    } catch (err) {
      addNotification('Erro', err.response?.data || 'Erro ao atualizar nome da playlist.');
    }
  };

  const toggleUpdateMode = async () => {
    setIsUpdating(prev => !prev);
    if (!isUpdating) {
      await fetchAllSongs();
    }
  };

  const toggleSongSelection = (songId) => {
    setSelectedSongs(prev =>
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  };

  const addSongsToPlaylist = async () => {
    try {
      for (const idOfSong of selectedSongs) {
        console.log(idOfSong);
        await axios.post(`/playlists/minhasPlaylists/${mongoId}/adicionarMusica?songId=${idOfSong}`);
      }
      addNotification("Sucesso", "Músicas adicionadas!");
      setSelectedSongs([]);
      setIsUpdating(false);
      fetchPlaylistSongs();
    } catch (err) {
      addNotification("Erro", err.response?.data || "Erro ao adicionar músicas.");
    }
  };

  

  return (
    <div className="text-center mt-4" style={{ width: "800px" }}>
      <div className="d-flex align-items-center">
        {isEditingTitle ? (
          <>
            <input
              type="text"
              className="form-control"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ maxWidth: '300px', fontSize: '1.5rem' }}
            />
            <button className="btn btn-success ms-2" onClick={updatePlaylistName}>✔️</button>
            <button className="btn btn-secondary ms-2 me-2" onClick={() => {
              setIsEditingTitle(false);
              setNewTitle(title);
            }}>
              <X />
            </button>
          </>
        ) : (
          <>
            <h1>{displayedTitle}</h1>
            <button className="btn song-button-mod ms-auto me-2" onClick={() => setIsEditingTitle(true)}>
              <Pencil />
            </button>
          </>
        )}
        <button className="btn song-button-mod" onClick={() => setIsCollapsed(!isCollapsed)}>
          <ArrowDown />
        </button>
        
      </div>

      
      <div className="card">
        {isCollapsed && (
          <div className="card-body mt-2">
            <button className="btn btn-outline-danger mb-2" onClick={deletePlaylist}>
              Deletar playlist <X />
            </button>

            <button className="btn btn-outline-primary mb-2 ms-2" onClick={toggleUpdateMode}>
              {isUpdating ? "Cancelar" : "Adicionar músicas"}
            </button>
            
            {isUpdating && (
              <div>
                <h5>Selecione músicas para adicionar</h5>
                {allSongs.map(song => (
                  <div key={song.id} className="form-check d-flex align-items-center mb-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`update-${song.id}`}
                      checked={selectedSongs.includes(song.id)}
                      onChange={() => toggleSongSelection(song.id)}
                      disabled={playlistSongs.some(ps => ps.id === song.id)}
                    />
                    <label className="form-check-label ms-2" htmlFor={`update-${song.id}`}>
                      {song.title} - {song.artist}
                    </label>
                  </div>
                ))}
                <button className="btn btn-success mt-2" onClick={addSongsToPlaylist}>
                  Confirmar
                </button>
              </div>
            )}

            <hr />

            <div style={{justifyItems: "center"}}>
                {Array.isArray(playlistSongs) ? (
                  playlistSongs.map(song => (
                    <PlaylistSongCard
                      key={song.id}
                      songId={song.id}
                      playlistId={mongoId}
                      title={song.title}
                      artist={song.artist}
                      image={song.imageUrl}
                      previewUrl={song.previewUrl}
                      deezerLink={song.deezerLink}
                      onDelete={fetchPlaylistSongs}
                    />
                  ))
                ) : (
                  <p>Erro ao carregar músicas da playlist.</p>
                )}

            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}