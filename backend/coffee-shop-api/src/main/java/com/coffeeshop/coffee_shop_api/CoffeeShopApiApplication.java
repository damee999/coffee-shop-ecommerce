package com.coffeeshop.coffee_shop_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.coffeeshop.coffee_shop_api")
public class CoffeeShopApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(CoffeeShopApiApplication.class, args);
    }
}
