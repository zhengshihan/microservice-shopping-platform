package com.codevoyage.product_service.Service;

import com.codevoyage.product_service.Repository.ProductRepository;
import com.codevoyage.product_service.dto.ProductRequest;
import com.codevoyage.product_service.dto.ProductResponse;
import com.codevoyage.product_service.model.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;


    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                product.getPrice(), product.getEventStartTime(), product.getEventEndTime());
    }

    public List<ProductResponse> getProductsByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                        product.getPrice(), product.getEventStartTime(), product.getEventEndTime()))
                .toList();
    }

    public List<ProductResponse> getProductsByPriceRange(double minPrice, double maxPrice) {
        List<Product> products = productRepository.findByPriceBetween(minPrice, maxPrice);
        return products.stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                        product.getPrice(), product.getEventStartTime(), product.getEventEndTime()))
                .toList();
    }
    public ProductResponse updateProduct(String id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(productRequest.name());
        product.setDescription(productRequest.description());
        product.setPrice(productRequest.price());
        product.setEventStartTime(productRequest.eventStartTime());
        product.setEventEndTime(productRequest.eventEndTime());

        productRepository.save(product);

        return new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                product.getPrice(), product.getEventStartTime(), product.getEventEndTime());
    }
    public void deleteProduct(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        productRepository.delete(product);
        log.info("Product with id {} deleted successfully", id);
    }


    public List<ProductResponse> getUpcomingEvents() {
        LocalDateTime now = LocalDateTime.now();
        List<Product> products = productRepository.findByEventStartTimeAfter(now);
        return products.stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                        product.getPrice(), product.getEventStartTime(), product.getEventEndTime()))
                .toList();
    }
    public List<ProductResponse> getPastEvents() {
        LocalDateTime now = LocalDateTime.now();
        List<Product> products = productRepository.findByEventEndTimeBefore(now);
        return products.stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), product.getDescription(),
                        product.getPrice(), product.getEventStartTime(), product.getEventEndTime()))
                .toList();
    }


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
