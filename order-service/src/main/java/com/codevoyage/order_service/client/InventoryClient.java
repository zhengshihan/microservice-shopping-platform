package com.codevoyage.order_service.client;


import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange
public interface InventoryClient {

    @GetExchange("api/inventory")
    public boolean isInStock(@RequestParam String name, @RequestParam Integer quantity);
}
