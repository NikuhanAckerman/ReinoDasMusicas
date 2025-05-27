package trabalhojava.buscadordemusicasbrasileiras.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "PlaylistEntity")
@Getter @Setter
public class PlaylistEntity {

    @Id
    private String id;

    private List<String> listOfSongIds;

    private String title;

}
