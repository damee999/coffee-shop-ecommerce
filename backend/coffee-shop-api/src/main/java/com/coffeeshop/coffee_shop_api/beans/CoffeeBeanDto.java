package com.coffeeshop.coffee_shop_api.beans;
public record CoffeeBeanDto(
        Long id,
        String name,
        String origin,
        String roast,
        String tastingNotes,
        int priceCents,
        int weightG,
        String imageUrl) {
}
