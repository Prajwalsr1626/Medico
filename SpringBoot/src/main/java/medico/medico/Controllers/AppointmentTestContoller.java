package medico.medico.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.medico.Models.AppointmentTest;
import medico.medico.Repository.AppointmentTestRepository;
import medico.medico.Respones.Respones;

@CrossOrigin
@RestController
@RequestMapping("/Hospital")
public class AppointmentTestContoller {

    @Autowired
    AppointmentTestRepository appointmentTestRepository;

    @PostMapping("/addAppointementTest")
    public Respones addPatient(@RequestBody AppointmentTest appointmentTest)
    {
      
      AppointmentTest appointmentdata=appointmentTestRepository.save(appointmentTest);

      return new Respones(200,"Registerd Successfully",appointmentdata,"",true);

    }
}
