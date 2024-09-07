package com.codevoyage.product_service.Repository;

import com.codevoyage.product_service.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    List<Product> findByEventStartTimeAfter(LocalDateTime now);

    List<Product> findByEventEndTimeBefore(LocalDateTime now);
}