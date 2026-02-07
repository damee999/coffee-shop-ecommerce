package com.coffeeshop.coffee_shop_api.beans;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
public record UpdateCoffeeBeanRequest(
        @NotBlank @Size(max = 200) String name,
        @NotBlank @Size(max = 200) String origin,
        @NotBlank @Size(max = 20) String roast,
        @Size(max = 400) String tastingNotes,
        @NotNull @Min(0) Integer priceCents,
        @NotNull @Min(1) Integer weightG,
        @Size(max = 500) String imageUrl) {
}
