package com.thecodereveal.shopease.auth.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thecodereveal.shopease.entities.Address;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AUTH_USER_DETAILS")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private UUID Id;

    private String firstname;

    private String lastname;

    @JsonIgnore
    private String password;

    private Date createdOn;

    private Date updatedOn;

    @Column(nullable = false,unique = true)
    private String email;

    private String phoneNumber;

    private String provider;

    private String verificationCode;

    private boolean enabled= false;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name = "AUTH_USER_AUTHORITY", joinColumns = @JoinColumn(referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(referencedColumnName = "id"))
    private List<Authority> authorities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Address> addressList;

    @Override
    public Collection<?extends GrantedAuthority> getAuthorities(){
        return authorities;
    }

    @Override
    public String getPassword(){
        return this.password;
    }

    @Override
    public String getUsername(){
        return this.email;
    }



}
