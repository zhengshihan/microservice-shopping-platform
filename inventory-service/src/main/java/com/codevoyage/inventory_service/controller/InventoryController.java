package com.codevoyage.inventory_service.controller;

import com.codevoyage.inventory_service.dto.InventoryRequest;
import com.codevoyage.inventory_service.dto.InventoryResponse;
import com.codevoyage.inventory_service.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStock(@RequestParam String name, @RequestParam Integer quantity) {
        return inventoryService.isInStock(name, quantity);
    }
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryResponse> getAllInventories() {
        return inventoryService.getAllInventories();
    }
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryResponse createInventory(@RequestBody InventoryRequest inventoryRequest) {
        return inventoryService.createInventory(inventoryRequest);
    }

    // 增加库存项的数量
    @PutMapping("/add")
    @ResponseStatus(HttpStatus.OK)
    public InventoryResponse addInventory(@RequestBody InventoryRequest inventoryRequest) {
        return inventoryService.addInventory(inventoryRequest);
    }

    // 减少库存项的数量
    @PutMapping("/decrease")
    @ResponseStatus(HttpStatus.OK)
    public InventoryResponse decreaseInventory(@RequestBody InventoryRequest inventoryRequest) {
        return inventoryService.decreaseInventory(inventoryRequest);
    }
}