package medico.medico.Controllers;

import java.util.List;
import java.util.Optional;

import javax.mail.internet.MimeMessage;

import medico.medico.Models.Hospitals;
import medico.medico.Repository.HospitalsRepository;
import medico.medico.Respones.JWTResponseData;
import medico.medico.Respones.Respones;
import medico.medico.security.JwtTokenUtil;
import medico.medico.service.HospitalsDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/Hospital")
public class HospitalsController {

    @Autowired
    private JavaMailSender javaMailSender;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	
    @Autowired
    PasswordEncoder passwordEncoder;

	 @Autowired
	private UserDetailsService userDetailsService; 
    
    @Autowired
    HospitalsRepository hospitalsRepository;
    @Autowired
    HospitalsDetailService hospitalsDetailService;

    @PostMapping("/addHospital")
    public Respones addHospital(@RequestBody Hospitals hospitals)
    {

        boolean val=hospitalsDetailService.addHospitals(hospitals);
        if(val==false){
            return new Respones("200","Hospitals saved Successfully",true);
        }
        return new Respones("400","Hospitals saved Successfully",true);
    }
    @PostMapping("/register")
    public Respones saveUser(@RequestBody Hospitals hospitals) 
	{

        boolean hoscheck=hospitalsRepository.existsById(hospitals.getHospitalid());

		if (hoscheck==false){
        SendVerifyMail(hospitals.getHospitalname(),hospitals.getEmail(),hospitals.getHospitalid());
        hospitals.setPassword(passwordEncoder.encode(hospitals.getPassword()));
        hospitalsRepository.save(hospitals);
        return new Respones("Vrification Mail sent to Your Email","Hospitals saved Successfully",true);
        }
		else
			return new Respones("Hospitals with This Id Already Exists","Hospitals with This Id Already Exists",false);
	}
    private boolean SendVerifyMail(String name,String email,String hospitalid) 
	{
		try {
			SimpleMailMessage msg = new SimpleMailMessage();
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
	        messageHelper.setFrom("prajwalsr1999@gmail.com");
	        messageHelper.setTo(email);
	        messageHelper.setSubject("Verification Mail from PatientWeb");
	        messageHelper.setText("<b><a href=http://localhost:8080/Hospital/vrifcation/"+hospitalid+">click </a></b>", true);
	        javaMailSender.send(mimeMessage);
			return true;
		}catch(Exception ex) {
			System.out.println(ex.getMessage());
			return false;
		}
	}

    @GetMapping("/vrifcation/{Hospitalid}")
    public String vrification(@PathVariable String Hospitalid)
    {
        Hospitals hosdata=hospitalsRepository.findById(Hospitalid).get();
        System.out.println(hosdata);
        hosdata.setHosstatus(true);
        System.out.println(hosdata);
        hospitalsRepository.save(hosdata);
        return "<h1>"+Hospitalid+"</h1>";
    }
    
    @GetMapping("/findHospital")
    public Respones addfind()
    {
        List<Hospitals> hosdata=hospitalsRepository.findAll();
        return new Respones("200",hosdata,true);
    }
    

  /*   @GetMapping("/hopitaldata")
    public Respones Hospitalsdata(){

        return new Respones("200",hospitalidata,true);
    }
     */
    @PostMapping("/logout")
    public Respones addHospital(@RequestBody String logutstring)
    {
        System.out.println(logutstring);
        return new Respones("200","Logout Sucessfully",true);
    }


    @PostMapping("/loginHospital")
	public ResponseEntity login(@RequestBody Hospitals hospitals) 
	{
		try {
            Hospitals hosdata=hospitalsRepository.findById(hospitals.getHospitalid()).get();
            System.out.println(hosdata);
            if(hosdata.isHosstatus()){
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(hospitals.getHospitalid(),hospitals.getPassword()));

           // boolean hosdataisthare=hospitalsRepository.existsById(hospitals.getHospitalid());
            
            String hosdatais=hospitalsDetailService.gethosid(hospitals);

			final String token = jwtTokenUtil.generateToken(hosdatais);
            
			return ResponseEntity.ok(new JWTResponseData(true, token, "Login Successfully",hosdatais));
            }else{
                return ResponseEntity.ok(new JWTResponseData(false, "", "verify Email!!",""));
            }
		} catch (DisabledException e) {
			return ResponseEntity.ok(new JWTResponseData(false, "", "User Disabled !",""));
		} catch (BadCredentialsException e) {
			return ResponseEntity.ok(new JWTResponseData(false, "", "Invalid User !",""));
		} catch (Exception e){
            return ResponseEntity.ok(new JWTResponseData(false, "", "Invalid User !",""));
        }
	}
    

}
