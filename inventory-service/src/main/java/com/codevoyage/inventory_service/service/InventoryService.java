package com.codevoyage.inventory_service.service;

import com.codevoyage.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public boolean isInStock(String name, Integer quantity) {
        log.info(" Start -- Received request to check stock for skuCode {}, with quantity {}", name, quantity);
        boolean isInStock = inventoryRepository.existsByNameAndQuantityIsGreaterThanEqual(name, quantity);
        log.info(" End -- Product with skuCode {}, and quantity {}, is in stock - {}", name, quantity, isInStock);
        return isInStock;
    }
}