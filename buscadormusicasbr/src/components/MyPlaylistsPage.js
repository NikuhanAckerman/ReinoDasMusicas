import PlaylistOffcanvas from './PlaylistOffcanvas';
import React from 'react';
import { getMyPlaylists } from '../functions/songApi';
import PlaylistsCard from './PlaylistsCard';
import { useState, useEffect } from 'react';
import { PlusSquareFill } from 'react-bootstrap-icons';

export default function MyPlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    const data = await getMyPlaylists();
    setPlaylists(data);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div>
      <h1 className="text-center my-songs-title" style={{padding: "0", }}>Playlists</h1>
      <div className="text-center">
        <button 
        className="btn song-button mt-2"
        style={{width: "200px"}}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#playlistOffCanvas"
        aria-controls="playlistOffCanvas"
        >
          <PlusSquareFill/>
        </button>
      </div>
      
      <div style={{justifySelf: "center"}}>
        {playlists.map((playlist) => (
          <PlaylistsCard
            key={playlist.id}
            mongoId={playlist.id}
            title={playlist.title}
            onDelete={fetchPlaylists}
          />
          ))}
      </div>

      <PlaylistOffcanvas onPlaylistCreated={fetchPlaylists} />
    </div>
  );
}