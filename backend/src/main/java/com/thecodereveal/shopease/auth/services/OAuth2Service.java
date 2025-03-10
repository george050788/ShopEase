package com.thecodereveal.shopease.auth.services;

import com.thecodereveal.shopease.auth.entities.User;
import com.thecodereveal.shopease.auth.repositories.UserDetailRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuth2Service {

    @Autowired
    UserDetailRepositories userDetailRepositories;

    @Autowired
    private AuthorityService authorityService;

    public User getUser(String userName) {
        return userDetailRepositories.findByEmail(userName);
    }

    public User createUser(OAuth2User oauth2User, String provider) {
        String firstName= oauth2User.getAttribute("given_name");
        String lastName= oauth2User.getAttribute("family_name");
        String email = oauth2User.getAttribute("email");
        User user= User.builder()
                .firstname(firstName)
                .lastname(lastName)
                .email(email)
                .provider(provider)
                .enabled(true)
                .authorities(authorityService.getUserAuthority())
                .build();
        return userDetailRepositories.save(user);
    }
}
