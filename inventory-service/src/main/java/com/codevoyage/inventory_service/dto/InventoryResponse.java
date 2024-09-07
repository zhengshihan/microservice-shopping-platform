package com.codevoyage.inventory_service.dto;

import java.time.LocalDateTime;

public record InventoryResponse(Long id, String name, Integer quantity) { }
