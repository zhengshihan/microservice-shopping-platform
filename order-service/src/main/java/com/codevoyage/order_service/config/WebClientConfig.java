package com.codevoyage.order_service.config;

import com.codevoyage.order_service.client.InventoryClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class WebClientConfig {

    @Autowired
    private LoadBalancedExchangeFilterFunction filterFunction;


    @Bean
    public WebClient inventoryWebClient() {
        return WebClient.builder()
                .baseUrl("http://inventory-service")
                .filter(filterFunction)
                .build();
    }

    @Bean
    public InventoryClient inventoryClientClient() {
        HttpServiceProxyFactory httpServiceProxyFactory
                = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(inventoryWebClient()))
                .build();
        return httpServiceProxyFactory.createClient(InventoryClient.class);
    }
}