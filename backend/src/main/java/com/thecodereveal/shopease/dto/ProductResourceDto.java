package com.thecodereveal.shopease.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResourceDto {

    private UUID id;
    private String name;
    private String url;
    private String type;
    private Boolean isPrimary;

}
