package com.codevoyage.product_service.Repository;

import com.codevoyage.product_service.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}