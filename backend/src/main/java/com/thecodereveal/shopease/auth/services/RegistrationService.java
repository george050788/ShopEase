package com.thecodereveal.shopease.auth.services;

import com.thecodereveal.shopease.auth.dto.RegistrationRequest;
import com.thecodereveal.shopease.auth.dto.RegistrationResponse;
import com.thecodereveal.shopease.auth.entities.User;
import com.thecodereveal.shopease.auth.helper.VerificationCodeGenerator;
import com.thecodereveal.shopease.auth.repositories.UserDetailRepositories;
import com.thecodereveal.shopease.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

import java.rmi.server.ServerCloneException;

@Service
public class RegistrationService {

    @Autowired
    private UserDetailRepositories userDetailRepositories;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public RegistrationResponse createUser(RegistrationRequest request) {
        User existing = userDetailRepositories.findByEmail(request.getEmail());

        if(null != existing){
            return RegistrationResponse.builder()
                    .code(400)
                    .message("Email already exist!")
                    .build();
        }

        try {
            User user = new User();
            user.setFirstname(request.getFirstName());
            user.setLastname(request.getLastName());
            user.setEmail(request.getEmail());
            user.setEnabled(false);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setProvider("manual");

            String code = VerificationCodeGenerator.generateCode();

            user.setVerificationCode(code);
            user.setAuthorities(authorityService.getUserAuthority());
            userDetailRepositories.save(user);
            emailService.sendMail(user);

            return RegistrationResponse.builder()
                    .code(200)
                    .message("User created!")
                    .build();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            throw new ServerErrorException(e.getMessage(),e.getCause());
        }
    }

    public void verifyUser(String userName) {
        User user = userDetailRepositories.findByEmail(userName);
        user.setEnabled(true);
        userDetailRepositories.save(user);
    }

    public void updateUserVerificationCode(User user) {
        userDetailRepositories.save(user);
    }
}
