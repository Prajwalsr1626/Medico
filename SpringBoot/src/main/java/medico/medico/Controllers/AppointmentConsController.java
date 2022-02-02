package medico.medico.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.medico.Models.AppointmentCons;
import medico.medico.Repository.AppointmentConsRepository;
import medico.medico.Respones.Respones;

@CrossOrigin
@RestController
@RequestMapping("/Hospital")
public class AppointmentConsController {

    @Autowired
    AppointmentConsRepository appointmentConsRepository;
    @PostMapping("/addAppointementcon")
    public Respones addPatient(@RequestBody AppointmentCons appointmentcon)
    {
      
      List<AppointmentCons> checkAppointment=appointmentConsRepository.findAll().stream().filter(data->data.getDate().equals(appointmentcon.getDate())).collect(Collectors.toList());
      for(AppointmentCons ap:checkAppointment){
          if(ap.getPatid().equals(appointmentcon.getPatid())){
            return new Respones(400,"Appointement Alreay for this Day ","","",false);
          }
      }
      AppointmentCons appointmentdata=appointmentConsRepository.save(appointmentcon);
      return new Respones(200,"Appointement taken Successfully",appointmentdata,"",true);

    }


    @GetMapping("/getAppointbypid/{pid}")
    public Respones getAppointbyPid(@PathVariable String pid)
    {
      
      List<AppointmentCons> checkAppointment=appointmentConsRepository.findAll().stream().filter(data->data.getPatid().equals(pid))
      .collect(Collectors.toList());
      
      return new Respones(200,"Registerd Successfully",checkAppointment,"",true);

    }
    @GetMapping("/getAppointbyhosid/{hosid}")
    public Respones getAppointbyhosid(@PathVariable String hosid)
    {
      
      List<AppointmentCons> checkAppointment=appointmentConsRepository.findAll().stream()
      .filter(data->data.getHospitalid().equals(hosid))
      .filter(data->data.getStatusMessage().equals("Pending")).
      filter(data->data.isStatus()==false).collect(Collectors.toList());
      
      return new Respones(200,"data Successfully",checkAppointment,"",true);

    }

    @GetMapping("/AccpetConApp/{apid}")
    public Respones AppointAccpet(@PathVariable String apid)
    {

      AppointmentCons appdata=appointmentConsRepository.findById(apid).get();
      appdata.setStatus(true);
      appdata.setStatusMessage("Accepted");
      appointmentConsRepository.save(appdata);
      AppointmentCons appdat2=appointmentConsRepository.findById(apid).get();
       return new Respones(200,"data Successfully",appdat2,"",true);
    }

    
    @GetMapping("/check/{datev}")
    public Respones Check(@PathVariable String datev)
    {
    
      List<AppointmentCons> checkAppointment=appointmentConsRepository.findAll().stream().filter(data->data.getDate().equals(datev)).collect(Collectors.toList());
      for(AppointmentCons ap:checkAppointment){
         System.out.println(ap.getPatid());
      }
     
      return new Respones(200,"Registerd Successfully",checkAppointment,"",true);

    }

    @GetMapping("/RejectConApp/{apid}")
    public Respones Rejectapp(@PathVariable String apid)
    {

      AppointmentCons appdata=appointmentConsRepository.findById(apid).get();
      appdata.setStatus(false);
      appdata.setStatusMessage("Rejected");
      appointmentConsRepository.save(appdata);
      AppointmentCons appdat2=appointmentConsRepository.findById(apid).get();
       return new Respones(200,"data Successfully",appdat2,"",true);
    }

    @GetMapping("/Accpetconrequest/{hosid}")
    public Respones Accpetconrequest(@PathVariable String hosid)
    {

      List<AppointmentCons> appointment=appointmentConsRepository.findAll().stream()
      .filter(data->data.getHospitalid().equals(hosid)).
      filter(data->data.isStatus()==true).collect(Collectors.toList());
       return new Respones(200,"data Successfully",appointment,"",true);
    }
    
}
  