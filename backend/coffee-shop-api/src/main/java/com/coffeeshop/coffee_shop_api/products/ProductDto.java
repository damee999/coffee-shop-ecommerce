package com.coffeeshop.coffee_shop_api.products;
public record ProductDto(
        Long id,
        String name,
        String description,
        Integer priceCents,
        String imageUrl) {
}
