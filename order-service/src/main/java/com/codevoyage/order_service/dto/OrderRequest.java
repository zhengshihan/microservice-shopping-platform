package com.codevoyage.order_service.dto;

import java.math.BigDecimal;

public record OrderRequest(Long id, String orderNumber, String eventName,
                           BigDecimal price, Integer quantity) {
}
