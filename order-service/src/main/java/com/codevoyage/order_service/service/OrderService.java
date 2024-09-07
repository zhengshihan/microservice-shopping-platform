package com.codevoyage.order_service.service;

import com.codevoyage.inventory_service.dto.InventoryRequest;
import com.codevoyage.order_service.client.InventoryClient;
import com.codevoyage.order_service.dto.OrderRequest;
import com.codevoyage.order_service.event.OrderPlacedEvent;
import com.codevoyage.order_service.model.Order;
import com.codevoyage.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional

public class OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);
    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;
    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    public void placeOrder(OrderRequest orderRequest) {
        var isProductInStock = inventoryClient.isInStock(orderRequest.eventName(),orderRequest.quantity());
       if(isProductInStock){
           Order order = new Order();
           order.setOrderNumber(UUID.randomUUID().toString());
           order.setPrice(orderRequest.price());
           order.setQuantity(orderRequest.quantity());
           order.setEventName(orderRequest.eventName());
        orderRepository.save(order);
           var orderPlacedEvent = new OrderPlacedEvent(order.getOrderNumber(), "mockemail.com",
                   "fake",
                   "fake");
           log.info("Start- Sending OrderPlacedEvent {} to Kafka Topic", orderPlacedEvent);
           kafkaTemplate.send("order-placed", orderPlacedEvent);
           log.info("End- Sending OrderPlacedEvent {} to Kafka Topic", orderPlacedEvent);
           InventoryRequest inventoryRequest = new InventoryRequest(orderRequest.eventName(),orderRequest.quantity());
           inventoryClient.decreaseInventory(inventoryRequest);
    }else {
           throw new RuntimeException("Product with eventName " + orderRequest.eventName() + " is not in stock");
       }


}}