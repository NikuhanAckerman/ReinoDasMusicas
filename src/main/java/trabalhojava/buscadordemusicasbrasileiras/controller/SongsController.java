package trabalhojava.buscadordemusicasbrasileiras.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import trabalhojava.buscadordemusicasbrasileiras.model.SongEntity;
import trabalhojava.buscadordemusicasbrasileiras.repository.SongsRepository;

import java.util.List;

@RestController
@RequestMapping("/musicas")
public class SongsController {

    @Autowired
    SongsRepository songsRepository;

    public SongsController(SongsRepository songsRepository) {
        this.songsRepository = songsRepository;
    }

    @GetMapping("/minhasMusicas")
    public List<SongEntity> getAllSongs() {
        return songsRepository.findAll();
    }

    @GetMapping("/minhasMusicas/{id}")
    public ResponseEntity<SongEntity> getSongById(@PathVariable String id) {
        return songsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/adicionarMusica")
    public void adicionarMusica(@RequestBody SongEntity song) {
        songsRepository.save(song);
        
    }

    @DeleteMapping("/deletarMusica/{id}")
    public void deletarMusica(@PathVariable String id) {
        songsRepository.deleteById(id);
    }

}
