package com.codevoyage.product_service.controller;

import com.codevoyage.product_service.Service.ProductService;
import com.codevoyage.product_service.dto.ProductRequest;
import com.codevoyage.product_service.dto.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor

public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getProductsByName(@RequestParam String name) {
        return productService.getProductsByName(name);
    }

    @GetMapping("/price")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getProductsByPriceRange(@RequestParam double min, @RequestParam double max) {

        return productService.getProductsByPriceRange(min, max);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse updateProduct(@PathVariable String id, @RequestBody ProductRequest productRequest) {
        return productService.updateProduct(id, productRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/upcoming")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getUpcomingEvents() {
        return productService.getUpcomingEvents();
    }

    @GetMapping("/past")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getPastEvents() {
        return productService.getPastEvents();
    }
}
