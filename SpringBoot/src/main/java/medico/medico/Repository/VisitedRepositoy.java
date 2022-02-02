package medico.medico.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import medico.medico.Models.Visited;

public interface VisitedRepositoy extends MongoRepository<Visited,String> {
    
}
