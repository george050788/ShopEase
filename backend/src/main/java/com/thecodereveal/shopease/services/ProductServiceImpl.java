package com.thecodereveal.shopease.services;

import com.thecodereveal.shopease.dto.ProductDto;
import com.thecodereveal.shopease.dto.ProductResourceDto;
import com.thecodereveal.shopease.dto.ProductVariantDto;
import com.thecodereveal.shopease.entities.*;
import com.thecodereveal.shopease.exceptions.ResourceNotFoundEx;
import com.thecodereveal.shopease.mapper.ProductMapper;
import com.thecodereveal.shopease.repositories.ProductRepository;
import com.thecodereveal.shopease.specification.ProductSpecification;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public Product addProduct(ProductDto productDto){
        Product product = productMapper.mapToProductEntity(productDto);
        return productRepository.save(product);
    }

    @Override
    public List<ProductDto> getAllProducts(UUID categoryId, UUID typeId){

        Specification<Product> productSpecification = Specification.where(null);
        if(null != categoryId){
           productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }
        if(null != typeId){
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
        }
        List<Product> products = productRepository.findAll(productSpecification);
//        To-do mapping of products into productDto

        return productMapper.getProductDtos(products);
    }

    @Override
    public ProductDto getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug);
        if(null == product){
            throw new ResourceNotFoundEx("Product Not Found!");
        }
        ProductDto productDto = productMapper.mapProductToDto(product);
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setCategoryTypeId(product.getCategoryType().getId());
        productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariants()));
        productDto.setProductResources(productMapper.mapProductResourcesListDto(product.getResources()));
        return productDto;
    }

    @Override
    public ProductDto getProductById(UUID id) {
        Product product = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundEx("Product Not Found!"));
        ProductDto productDto = productMapper.mapProductToDto(product);
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setCategoryTypeId(product.getCategoryType().getId());
        productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariants()));
        productDto.setProductResources(productMapper.mapProductResourcesListDto(product.getResources()));
        return productDto;
    }

    @Override
    public Product updateProduct(ProductDto productDto) {
        Product product = productRepository.findById(productDto.getId()).orElseThrow(()->new ResourceNotFoundEx("Product Not Found!"));

        return productRepository.save(productMapper.mapToProductEntity(productDto));
    }

    @Override
    public Product fetchProductById(UUID id)throws Exception{
        return productRepository.findById(id).orElseThrow(BadRequestException::new);
    }


    private Product mapToProductEntity(ProductDto productDto){
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setBrand(productDto.getBrand());
        product.setNewArrival(productDto.isNewArrival());
        product.setPrice(productDto.getPrice());
        product.setRating(productDto.getRating());

        Category category = categoryService.getCategory(productDto.getCategoryId());
        if(null != category){
            product.setCategory(category);
            UUID categoryTypeId = productDto.getCategoryTypeId();
            CategoryType categoryType = category.getCategoryTypes().stream().filter(categoryType1 -> categoryType1.getId().equals(categoryTypeId)).findFirst().orElse(null);
            product.setCategoryType(categoryType);
        }
        if(null != productDto.getVariants()){
            product.setProductVariants(mapToProductVariant(productDto.getVariants(), product));
        }

        if(null != productDto.getProductResources()){
            product.setResources(mapToProductResources(productDto.getProductResources(),product));
        }


        return productRepository.save(product);
    }

    private List<Resources> mapToProductResources(List<ProductResourceDto> productResources, Product product){
        return productResources.stream().map(productResourceDto -> {
            Resources resources = new Resources();
            resources.setName(productResourceDto.getName());
            resources.setType(productResourceDto.getType());
            resources.setUrl(productResourceDto.getUrl());
            resources.setIsPrimary(productResourceDto.getIsPrimary());
            resources.setProduct(product);
            return resources;
        }).collect(Collectors.toList());
    }
    private List<ProductVariant> mapToProductVariant(List<ProductVariantDto> productVariantDtos,Product product){
        return productVariantDtos.stream().map(productVariantDto -> {
            ProductVariant productVariant = new ProductVariant();
            productVariant.setColor(productVariantDto.getColor());
            productVariant.setSize(productVariantDto.getSize());
            productVariant.setStockQuantity(productVariantDto.getStockQuantity());
            productVariant.setProduct(product);
            return productVariant;
        }).collect(Collectors.toList());
    }


}
