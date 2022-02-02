package medico.medico.Controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import medico.medico.Models.Visited;
import medico.medico.Repository.AppointmentConsRepository;
import medico.medico.Repository.AppointmentTestRepository;
import medico.medico.Repository.VisitedRepositoy;
import medico.medico.Respones.Respones;


@CrossOrigin
@RestController
@RequestMapping("/Hospital")

public class VisitedControllers {

@Autowired
VisitedRepositoy visitedRepositoy;

@Autowired
AppointmentTestRepository appointmentTestRepository;

@Autowired
AppointmentConsRepository appointmentConsRepository;

@PostMapping("/visisted")
public Respones addPatient(@RequestBody Visited visited)
{
    Visited visited1 =visitedRepositoy.save(visited);

    appointmentTestRepository.deleteById(visited.getAppointId());
  return new Respones(200,"Appointement taken Successfully", visited1,"",true);

}

@PostMapping("/visistedcon")
public Respones vistedcon(@RequestBody Visited visited)
{
    Visited visited1 =visitedRepositoy.save(visited);

    appointmentConsRepository.deleteById(visited.getAppointId());

  return new Respones(200,"Appointement taken Successfully", visited1,"",true);

}   
@GetMapping("/getAppointvited/{hosid}")
    public Respones getAppointbyhosid(@PathVariable String hosid)
    {
      
      List<Visited> testdata=visitedRepositoy.findAll().stream()
      .filter(data->data.getHospitalid().equals(hosid)).
      filter(data->data.getStatusMessage().equals("Visited"))
       .collect(Collectors.toList());
      
      return new Respones(200,"data Successfully",testdata,"",true);

    }
    @GetMapping("/getAppointpatient/{pid}")
    public Respones getAppointbypid(@PathVariable String pid)
    {
      
      List<Visited> testdata=visitedRepositoy.findAll().stream()
      .filter(data->data.getPatid().equals(pid))
       .collect(Collectors.toList());
      
      return new Respones(200,"data Successfully",testdata,"",true);

    }

 @PostMapping("/addpasite")
    public Respones addImage(@RequestParam String visitId , @RequestParam MultipartFile imageFile) {
        // directory path
        String directoryName = "/home/files";

      //  Product product = productService.validateId(productId);
      Visited visited =visitedRepositoy.findById(visitId).get();
        /* if (product == null) {
            return new ResponseData(404, null, productId + "product not present in the data base");
        } */
        try {
            // file bytes
            byte bytes[] = imageFile.getBytes();

            // file extension
            String fileName = imageFile.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf("."));

            // file name
            fileName = UUID.randomUUID().toString() + extension;

            // uploading file into folder
            File file = new File(directoryName, fileName);
            FileOutputStream fileOutStream = new FileOutputStream(file);
            fileOutStream.write(bytes);
            fileOutStream.close();

            // updating the images list
          
           // adding new image to the list
           // visited.setFile(file.getAbsolutePath());
        }catch(Exception e)
        {
            return new Respones(200,"data not uplodeed","","",false);
        }
        return new Respones(200,"Appointement taken Successfully","","",true);
    }


    
}
