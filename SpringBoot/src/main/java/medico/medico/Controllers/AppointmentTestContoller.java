package medico.medico.Controllers;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalDateTime;  
import java.time.format.DateTimeFormatter;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
      
      List<AppointmentTest> checkAppointment=appointmentTestRepository.findAll().stream().filter(data->data.getDate().equals(appointmentTest.getDate())).collect(Collectors.toList());
      for(AppointmentTest ap:checkAppointment){
          if(ap.getPatid().equals(appointmentTest.getPatid())){
            return new Respones(400,"Appointement Alreay for this Day ","","",false);
          }
      }
      AppointmentTest appointmentdata=appointmentTestRepository.save(appointmentTest);

      return new Respones(200,"Apointement Taken Successfully",appointmentdata,"",true);

    }
    @GetMapping("/getAppointbytestid/{pid}")
    public Respones getAppointbyPid(@PathVariable String pid)
    {
      
      List< AppointmentTest> checkAppointment=appointmentTestRepository.findAll().stream()
      .filter(data->data.getPatid().equals(pid))
      
      .collect(Collectors.toList());

      return new Respones(200,"Registerd Successfully",checkAppointment,"",true);

    }
    @GetMapping("/getAppointbytesthosid/{hosid}")
    public Respones getAppointbyhosid(@PathVariable String hosid)
    {
      
      List<AppointmentTest> testdata=appointmentTestRepository.findAll().stream()
      .filter(data->data.getHospitalid().equals(hosid)).
      filter(data->data.getStatusMessage().equals("Pending")).
      filter(data->data.isStatus()==false).collect(Collectors.toList());
      
      return new Respones(200,"data Successfully",testdata,"",true);

    }

    @GetMapping("/Accpettestapp/{apid}")
    public Respones AppointAccpet(@PathVariable String apid)
    {

      AppointmentTest appdata=appointmentTestRepository.findById(apid).get();
      appdata.setStatus(true);
      appdata.setStatusMessage("Accepted");
      appointmentTestRepository.save(appdata);
      AppointmentTest appdat2=appointmentTestRepository.findById(apid).get();
       return new Respones(200,"data Successfully",appdat2,"",true);
    }

    @GetMapping("/RejecttestApp/{apid}")
    public Respones Rejectapp(@PathVariable String apid)
    {

      AppointmentTest appdata=appointmentTestRepository.findById(apid).get();
      appdata.setStatus(false);
      appdata.setStatusMessage("Rejected");
      appointmentTestRepository.save(appdata);
      AppointmentTest appdat2=appointmentTestRepository.findById(apid).get();
       return new Respones(200,"data Successfully",appdat2,"",true);
    }

    @GetMapping("/gettodaycons/{hosid}")
    public Respones gettodayAppointmentcon(@PathVariable String hosid)
    {
      LocalDate localDate= java.time.LocalDate.now();   
      String today=localDate.toString(); 
      List<AppointmentTest> testdata=appointmentTestRepository.findAll().stream()
      .filter(data->data.getHospitalid().equals(hosid))
      .filter(data->data.getDate().equals(today)).
      filter(data->data.isStatus()==true).collect(Collectors.toList());
      return new Respones(200,"data Successfully",testdata,"",true);

    }
    @GetMapping("/gettodayc")
    public Respones gettoday()
    {
      LocalDate localDate= java.time.LocalDate.now();   
      String today=localDate.toString();
      return new Respones(200,"data Successfully",today,"",true);

    }

}
