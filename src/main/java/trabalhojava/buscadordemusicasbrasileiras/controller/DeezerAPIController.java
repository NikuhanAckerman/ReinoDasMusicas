package trabalhojava.buscadordemusicasbrasileiras.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/deezerApi")
public class DeezerAPIController {

    @GetMapping("/pesquisarMusicas")
    public ResponseEntity<?> pesquisarMusicas(@RequestParam String titulo) {
        String url = "https://api.deezer.com/search?q=" + titulo;
        System.out.println("URL: " + url);

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        return ResponseEntity.ok(response);
    }

}
