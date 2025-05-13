import {React, useState} from 'react'
import UserDataButton from './UserDataButton'
import { MusicNoteBeamed, MusicNoteList } from 'react-bootstrap-icons'
import axios from 'axios'
import Searcher from './Searcher'
import SongCard from './SongCard'
import "../css/HomePage.css"

export default function HomePage() {
    const [songs, setSongs] = useState([]);

    const searchSongs = (query) => { 
        axios.get(`/deezerApi/pesquisarMusicas`, {
            params: { titulo: query }
        }).then((res) => {
            console.log(res.data.data);
            setSongs(res.data.data); // Deezer response is structured as { data: [...] }
        }).catch(console.error);
    };

    return (
    <div>
        
      <h1 className="text-center welcomeText">Bem vindo ao Reino da Música</h1>

      <div className="text-center userDataButtonsContainer">
        <UserDataButton buttonText=" MINHAS MÚSICAS" buttonIcon={<MusicNoteBeamed />} buttonHref={"/musicas/minhasMusicas"} />
        <UserDataButton buttonText=" MINHAS PLAYLISTS" buttonIcon={<MusicNoteList />} buttonHref={"#"} />
      </div>

      <Searcher searcherTopic="Procure uma música" onSearch={searchSongs} />

      <div className="text-center songCardsContainer">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            title={song.title}
            artist={song.artist.name}
            image={song.album.cover_medium}
            previewUrl={song.preview}
            deezerId={song.id}
            deezerLink={song.link}
          />
        ))}
      </div>


    </div>
  )
}
