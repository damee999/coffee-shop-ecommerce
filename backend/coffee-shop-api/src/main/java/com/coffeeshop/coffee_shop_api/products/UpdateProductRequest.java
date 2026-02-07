package com.coffeeshop.coffee_shop_api.products;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
public record UpdateProductRequest(
        @NotBlank @Size(max = 200) String name,
        @Size(max = 500) String description,
        @NotNull @Min(0) Integer priceCents,
        @Size(max = 500) String imageUrl) {
}
