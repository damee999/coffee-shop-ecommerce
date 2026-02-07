package com.coffeeshop.coffee_shop_api.common;
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
