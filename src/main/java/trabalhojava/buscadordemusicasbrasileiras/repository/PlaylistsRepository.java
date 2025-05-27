package trabalhojava.buscadordemusicasbrasileiras.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trabalhojava.buscadordemusicasbrasileiras.model.PlaylistEntity;
import trabalhojava.buscadordemusicasbrasileiras.model.SongEntity;

@Repository
public interface PlaylistsRepository extends MongoRepository<PlaylistEntity, String> {

}
