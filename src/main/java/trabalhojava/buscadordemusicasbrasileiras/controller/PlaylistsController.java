package trabalhojava.buscadordemusicasbrasileiras.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalhojava.buscadordemusicasbrasileiras.exception.PlaylistOperationException;
import trabalhojava.buscadordemusicasbrasileiras.exception.SongOperationException;
import trabalhojava.buscadordemusicasbrasileiras.model.PlaylistEntity;
import trabalhojava.buscadordemusicasbrasileiras.model.SongEntity;
import trabalhojava.buscadordemusicasbrasileiras.repository.PlaylistsRepository;
import trabalhojava.buscadordemusicasbrasileiras.repository.SongsRepository;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistsController {

    @Autowired
    private PlaylistsRepository playlistsRepository;

    @Autowired
    private SongsRepository songsRepository;

    @GetMapping("/minhasPlaylists")
    public List<PlaylistEntity> getAllPlaylists() {
        return playlistsRepository.findAll();
    }

    @GetMapping("/minhasPlaylists/{id}")
    public ResponseEntity<PlaylistEntity> getPlaylistById(@PathVariable String id) {
        if(playlistsRepository.findById(id).isEmpty()) {
            throw new PlaylistOperationException("Erro: Essa playlist não foi encontrada no perfil.");
        }
        return playlistsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/minhasPlaylists/{id}/musicas")
    public ResponseEntity<List<SongEntity>> getPlaylistMusicas(@PathVariable String id) {
        var playlistOpt = playlistsRepository.findById(id);
        if (playlistOpt.isEmpty()) {
            throw new PlaylistOperationException("Erro: Playlist não encontrada.");
        }

        List<SongEntity> listOfSongs = songsRepository.findAllById(playlistOpt.get().getListOfSongIds());

        return ResponseEntity.ok(listOfSongs);
    }

    @PostMapping("/minhasPlaylists/criarPlaylist")
    public void createPlaylist(@RequestBody PlaylistEntity playlist) {
        if(playlist == null) {
            throw new PlaylistOperationException("Erro: Playlist não recebida.");
        }
        if(playlist.getTitle().length() > 20) {
            throw new PlaylistOperationException("Erro: Nome da playlist muito longo. Escreva novamente com até 20 caracteres.");
        }
        boolean titleExists = playlistsRepository.findAll().stream()
                .map(PlaylistEntity::getTitle)
                .anyMatch(existingTitle -> existingTitle.equalsIgnoreCase(playlist.getTitle())); // case-insensitive check
        if(titleExists) {
            throw new PlaylistOperationException("Erro: Esse nome da playlist já existe.");
        }

        playlistsRepository.save(playlist);
    }


    @PostMapping("/minhasPlaylists/{id}/adicionarMusica")
    public ResponseEntity<PlaylistEntity> addSongToPlaylist(@PathVariable String id, @RequestParam String songId) {
        if(songsRepository.findById(songId).isEmpty()) {
            throw new PlaylistOperationException("Erro: Essa música não foi encontrada no perfil.");
        }
        if(playlistsRepository.findById(id).isEmpty()) {
            throw new PlaylistOperationException("Erro: Essa playlist não foi encontrada no perfil.");
        }
        if(playlistsRepository.findById(id).get().getListOfSongIds().contains(songId)) {
            throw new PlaylistOperationException("Erro: Essa música já existe na playlist.");
        }

        PlaylistEntity playlist = playlistsRepository.findById(id).get();
        playlist.getListOfSongIds().add(songId);
        playlistsRepository.save(playlist);

        return playlistsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/minhasPlaylists/{id}/removerMusica")
    public ResponseEntity<PlaylistEntity> removeSongFromPlaylist(@PathVariable String id, @RequestParam String songId) {

        List<SongEntity> listOfSongs = songsRepository.findAllById(playlistsRepository.findById(id).get().getListOfSongIds());

        if(songsRepository.findById(songId).isEmpty()) {
            throw new PlaylistOperationException("Erro: Essa música não foi encontrada no perfil.");
        }
        if(playlistsRepository.findById(id).isEmpty()) {
            throw new PlaylistOperationException("Erro: Essa playlist não foi encontrada no perfil.");
        }
        if(listOfSongs.stream().map(songEntity -> songEntity.getId().equals(songId)).findAny().isEmpty()) {
            throw new PlaylistOperationException("Erro: Essa música não foi encontrada nessa playlist.");
        }

        PlaylistEntity playlist = playlistsRepository.findById(id).get();
        playlist.getListOfSongIds().remove(songId);
        playlistsRepository.save(playlist);

        return playlistsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deletarPlaylist/{id}")
    public void deletePlaylist(@PathVariable String id) {
        if(playlistsRepository.findById(id).isEmpty()) {
            throw new SongOperationException("Erro: Essa playlist não foi encontrada no perfil.");
        }

        playlistsRepository.deleteById(id);
    }


}
