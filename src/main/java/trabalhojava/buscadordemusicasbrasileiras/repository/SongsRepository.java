package trabalhojava.buscadordemusicasbrasileiras.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trabalhojava.buscadordemusicasbrasileiras.model.SongEntity;

public interface SongsRepository extends MongoRepository<SongEntity, String> {
}
