package com.thecodereveal.shopease.auth.controller;


import com.thecodereveal.shopease.auth.config.JWTTokenHelper;
import com.thecodereveal.shopease.auth.dto.LoginRequest;
import com.thecodereveal.shopease.auth.dto.RegistrationRequest;
import com.thecodereveal.shopease.auth.dto.RegistrationResponse;
import com.thecodereveal.shopease.auth.dto.UserToken;
import com.thecodereveal.shopease.auth.entities.User;
import com.thecodereveal.shopease.auth.helper.VerificationCodeGenerator;
import com.thecodereveal.shopease.auth.services.RegistrationService;
import com.thecodereveal.shopease.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RegistrationService registrationService;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    EmailService emailService;

    @Autowired
    JWTTokenHelper jwtTokenHelper;

    @PostMapping("/login")
    public ResponseEntity<UserToken>login(@RequestBody LoginRequest loginRequest){
        try{
            Authentication authentication= UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getUserName(),
                    loginRequest.getPassword());

            Authentication authenticationResponse = this.authenticationManager.authenticate(authentication);


            if(authenticationResponse.isAuthenticated()){
                User user = (User) authenticationResponse.getPrincipal();
                if(!user.isEnabled()){
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
//                generate JWT Token
                String token = jwtTokenHelper.generateToken(user.getEmail());

                UserToken userToken=UserToken.builder().token(token).build();
                return new ResponseEntity<>(userToken,HttpStatus.OK);
            }
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return  new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest request){
        RegistrationResponse registrationResponse = registrationService.createUser(request);

        return new ResponseEntity<>(registrationResponse,
                registrationResponse.getCode()==200?HttpStatus.OK: HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> map){

        String userName = map.get("userName");
        String code = map.get("code");

        User user = (User) userDetailsService.loadUserByUsername(userName);
        if(null != user && user.getVerificationCode().equals(code)){
            registrationService.verifyUser(userName);
            return new ResponseEntity<>(HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerification(@RequestBody Map<String, String> map){
        try{
            String userName = map.get("userName");
            User user = (User) userDetailsService.loadUserByUsername(userName);

            if(user == null){
                return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
            }
            if(user.isEnabled()){
                return new ResponseEntity<>("User is already verified", HttpStatus.BAD_REQUEST);
            }
            String newCode = VerificationCodeGenerator.generateCode();

            user.setVerificationCode(newCode);
            registrationService.updateUserVerificationCode(user);
            emailService.sendMail(user);
            return new ResponseEntity<>("Verification email resent successfully", HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Error occurred while resending verification email", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
