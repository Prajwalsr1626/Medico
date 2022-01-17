package medico.medico.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.medico.Models.Patients;
import medico.medico.Repository.PatientsRepository;
import medico.medico.Respones.Respones;

@CrossOrigin
@RestController
@RequestMapping("/Hospital")
public class PatientsController 
{
    @Autowired
    PatientsRepository patientsRepository;

    @PostMapping("/PatientRegisterd")
    public Respones addPatient(@RequestBody Patients patients)
    {
        
        if(patientsRepository.count()>0){
            List<Patients> data = patientsRepository.findAll();
            for(Patients pat: data){
                if(pat.getEmail().equals(patients.getEmail())){
                    return new Respones(400,"Email Id Already exists","Patient Id Already exists","",false);
                }
            }
        }   
        patientsRepository.save(patients);
        return new Respones(200,"Registerd Successfully","Patient saved Successfully","",true);
    }
}
