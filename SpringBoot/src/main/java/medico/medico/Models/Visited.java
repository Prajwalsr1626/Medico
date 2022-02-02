package medico.medico.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Document("Visited")
public class Visited
 {
     @Id
     String visitId;
     String appointId;
     String hospitalid;
     String patid;
     String pname;
     String date;
     String time;
     String viname;
     String file;
     String statusMessage;
    
}
