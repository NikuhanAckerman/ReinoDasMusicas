import {React, useState, useEffect} from 'react'
import axios from 'axios'
import MySongs_SongCard from './MySongs_SongCard'
import { getMySongs } from "../functions/songApi.js"
import "../css/MySongsPage.css"

export default function MySongsPage() {
    const [songs, setSongs] = useState([]);

    const fetchSongs = async () => {
      const data = await getMySongs();
      setSongs(data);
    };

    useEffect(() => {
      fetchSongs();
    }, [songs]);

    return (
    <div>
        
      <h1 className="text-left my-songs-title">Músicas adicionadas</h1>

      <div className="text-center songCardsContainer">
        {songs.map((song) => (
          <MySongs_SongCard
            key={song.id}
            mongoId={song.id}
            title={song.title}
            artist={song.artist}
            image={song.imageUrl}
            previewUrl={song.previewUrl}
            deezerId={song.deezerId}
            deezerLink={song.deezerLink}
            onDelete={fetchSongs}
          />  
        ))}
      </div>


    </div>
  )
}
