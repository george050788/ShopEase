package com.thecodereveal.shopease.dto;

import com.thecodereveal.shopease.entities.ProductVariant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantDto {

    private UUID id;
    private String color;
    private String size;
    private Integer stockQuantity;
    private boolean isNewArrival;
    private UUID categoryId;
    private UUID categoryTypeId;
    private List<ProductVariantDto> variants;
}
