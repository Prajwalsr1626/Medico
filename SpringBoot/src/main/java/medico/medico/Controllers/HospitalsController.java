package medico.medico.Controllers;

import java.util.List;
import java.util.Optional;

import medico.medico.Models.Hospitals;
import medico.medico.Repository.HospitalsRepository;
import medico.medico.Respones.JWTResponseData;
import medico.medico.Respones.Respones;
import medico.medico.security.JwtTokenUtil;
import medico.medico.service.HospitalsDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/Hospital")
public class HospitalsController {


	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
    @Autowired
    PasswordEncoder passwordEncoder;

	/* @Autowired
	private UserDetailsService userDetailsService; */
    
    @Autowired
    HospitalsRepository hospitalsRepository;
    @Autowired
    HospitalsDetailService hospitalsDetailService;

    @PostMapping("/addHospital")
    public Respones addHospital(@RequestBody Hospitals hospitals)
    {

        boolean val=hospitalsDetailService.addHospitals(hospitals);
        if(val){
            return new Respones("200","Hospitals saved Successfully",true);
        }
        return new Respones("200","Hospitals saved Successfully",true);
    }
    
    @GetMapping("/findHospital")
    public Respones addfind()
    {
        List<Hospitals> hosdata=hospitalsRepository.findAll();
        return new Respones("200",hosdata,true);
    }
    
    /* @PostMapping("/loginHospital")
    public Respones login(@RequestBody Hospitals hospitals)
    {
        if(hospitalsRepository.count()>0){
            
            List<Hospitals> data = hospitalsRepository.findAll();
            for(Hospitals hos: data){
                if(hos.getHospitalid().equals(hospitals.getHospitalid()) && hos.getPassword().equals(hospitals.getPassword()))
                {
                    Optional<Hospitals> hosp = hospitalsRepository.findById(hos.getHospitalid());

                    return new Respones("200",hosp,true);
                }
            }
        }       
        return new Respones("400","Enter the proper Hospital id and Password",true);
    } */
    @PostMapping("/loginHospital")
	public ResponseEntity login(@RequestBody Hospitals hospitals) 
	{
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(hospitals.getHospitalid(),hospitals.getPassword()));

			Optional<Hospitals> hospitalsdata = hospitalsRepository.findById(hospitals.getHospitalid());
            boolean hosdataisthare=hospitalsRepository.existsById(hospitals.getHospitalid());
            if(hosdataisthare){
                String hosdatais=hospitalsDetailService.gethosid(hospitals);
			final String token = jwtTokenUtil.generateToken(hosdatais);

			return ResponseEntity.ok(new JWTResponseData(true, token, "Login Successfully"));
            }
		} catch (DisabledException e) {
			return ResponseEntity.ok(new JWTResponseData(false, "", "User Disabled !"));
		} catch (BadCredentialsException e) {
			return ResponseEntity.ok(new JWTResponseData(false, "", "Invalid User !"));
		}
        return null;
	}
    

}
