package com.codevoyage.product_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponse(String id, String name, String description,
                             BigDecimal price,LocalDateTime eventStartTime,LocalDateTime eventEndTime) { }
