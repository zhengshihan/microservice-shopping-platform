package com.codevoyage.inventory_service.service;

import com.codevoyage.inventory_service.dto.InventoryRequest;
import com.codevoyage.inventory_service.dto.InventoryResponse;
import com.codevoyage.inventory_service.model.Inventory;
import com.codevoyage.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public InventoryResponse createInventory(InventoryRequest inventoryRequest) {
        Inventory inventory = new Inventory();
        inventory.setName(inventoryRequest.name());
        inventory.setQuantity(inventoryRequest.quantity());
        inventoryRepository.save(inventory);
        log.info("Inventory created successfully");
        return new InventoryResponse(inventory.getId(), inventory.getName(), inventory.getQuantity()
                );
    }
    public InventoryResponse addInventory(InventoryRequest inventoryRequest) {
        Inventory inventory = inventoryRepository.findByName(inventoryRequest.name());
        inventory.setQuantity(inventory.getQuantity()+inventoryRequest.quantity());
        inventoryRepository.save(inventory);
        log.info("Inventory added successfully");
        return new InventoryResponse(inventory.getId(), inventory.getName(), inventory.getQuantity()
        );
    }
    public InventoryResponse decreaseInventory(InventoryRequest inventoryRequest) {
        Inventory inventory = inventoryRepository.findByName(inventoryRequest.name());
        inventory.setQuantity(inventory.getQuantity()-inventoryRequest.quantity());
        inventoryRepository.save(inventory);
        log.info("Inventory decreased successfully");
        return new InventoryResponse(inventory.getId(), inventory.getName(), inventory.getQuantity()
        );
    }

    public List<InventoryResponse> getAllInventories() {
        return inventoryRepository.findAll()
                .stream()
                .map(inventory -> new InventoryResponse(inventory.getId(), inventory.getName(), inventory.getQuantity()))
                .toList();
    }
}