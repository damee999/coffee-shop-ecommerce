package com.coffeeshop.coffee_shop_api.orders;
import java.util.List;
public record CreateOrderRequest(List<Item> items) {
    public record Item(Long productId, Integer qty) {
    }
}
