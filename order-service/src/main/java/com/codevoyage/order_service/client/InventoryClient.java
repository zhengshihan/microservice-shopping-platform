package com.codevoyage.order_service.client;


import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import org.springframework.web.service.annotation.PutExchange;

@HttpExchange
public interface InventoryClient {

    @GetExchange("api/inventory")
    public boolean isInStock(@RequestParam String name, @RequestParam Integer quantity);

    @PutExchange("api/inventory/decrease")
    public void decreaseInventory(@RequestBody com.codevoyage.inventory_service.dto.InventoryRequest inventoryRequest);


}