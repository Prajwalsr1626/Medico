package medico.medico.Repository;

import medico.medico.Models.Hospitals;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface HospitalsRepository extends MongoRepository<Hospitals,String> {
    
}
