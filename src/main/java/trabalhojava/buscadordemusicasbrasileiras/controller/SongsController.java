package trabalhojava.buscadordemusicasbrasileiras.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalhojava.buscadordemusicasbrasileiras.exception.SongOperationException;
import trabalhojava.buscadordemusicasbrasileiras.model.SongEntity;
import trabalhojava.buscadordemusicasbrasileiras.repository.SongsRepository;

import java.util.List;

@RestController
@RequestMapping("/musicas")
public class SongsController {

    @Autowired
    SongsRepository songsRepository;

    @GetMapping("/minhasMusicas")
    public List<SongEntity> getAllSongs() {
        return songsRepository.findAll();
    }

    @GetMapping("/minhasMusicas/{id}")
    public ResponseEntity<SongEntity> getSongById(@PathVariable String id) {
        if(songsRepository.findById(id).isEmpty()) {
            throw new SongOperationException("Erro: Essa playlist não foi encontrada no perfil.");
        }
        return songsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/adicionarMusica")
    public void adicionarMusica(@RequestBody SongEntity song) {
        if(songsRepository.existsByDeezerId(song.getDeezerId())) {
            throw new SongOperationException("Erro: Essa playlist já está adicionada no perfil.");
        }
        if(songsRepository.count() > 20) {
            throw new SongOperationException("Erro: A lista de playlists está com capacidade cheia.");
        }
        songsRepository.save(song);
    }

    @DeleteMapping("/deletarMusica/{id}")
    public void deletarMusica(@PathVariable String id) {
        if(songsRepository.findById(id).isEmpty()) {
            throw new SongOperationException("Erro: Essa música não foi encontrada no perfil.");
        }

        songsRepository.deleteById(id);
    }

}
