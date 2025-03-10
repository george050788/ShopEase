package com.thecodereveal.shopease.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@Table(name = "category_type")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryType {

    @GeneratedValue
    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String code;

    @ManyToOne
    @JoinColumn(name= "category_id", nullable = false)
    @JsonIgnore
    private Category category;
}
