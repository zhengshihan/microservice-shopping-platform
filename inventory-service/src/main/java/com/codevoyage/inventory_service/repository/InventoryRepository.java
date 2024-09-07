package com.codevoyage.inventory_service.repository;


import com.codevoyage.inventory_service.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    boolean existsByNameAndQuantityIsGreaterThanEqual(String name, Integer quantity);
    Inventory findByName(String name);
}