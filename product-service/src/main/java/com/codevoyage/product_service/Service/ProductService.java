package com.codevoyage.product_service.Service;

import com.codevoyage.product_service.Repository.ProductRepository;
import com.codevoyage.product_service.dto.ProductRequest;
import com.codevoyage.product_service.dto.ProductResponse;
import com.codevoyage.product_service.model.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;

    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.name())
                .description(productRequest.description())
                .price(productRequest.price())
                .eventStartTime(productRequest.eventStartTime())
                .eventEndTime(productRequest.eventEndTime())
                .build();
        productRepository.save(product);
        log.info("Product created successfully");
        return new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                product.getPrice(),product.getEventStartTime(),product.getEventEndTime());
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                        product.getPrice(),product.getEventStartTime(),product.getEventEndTime()))
                .toList();
    }
}
