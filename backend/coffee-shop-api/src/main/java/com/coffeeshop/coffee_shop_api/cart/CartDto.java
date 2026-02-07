package com.coffeeshop.coffee_shop_api.cart;
import java.util.List;
public class CartDto {
    private Long userId;
    private List<CartItemDto> items;
    private Integer totalCents;
    private Integer itemCount;
    public CartDto() {
    }
    public CartDto(Long userId, List<CartItemDto> items) {
        this.userId = userId;
        this.items = items;
        this.itemCount = items.size();
        this.totalCents = items.stream()
                .mapToInt(CartItemDto::getTotalCents)
                .sum();
    }
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public List<CartItemDto> getItems() {
        return items;
    }
    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }
    public Integer getTotalCents() {
        return totalCents;
    }
    public void setTotalCents(Integer totalCents) {
        this.totalCents = totalCents;
    }
    public Integer getItemCount() {
        return itemCount;
    }
    public void setItemCount(Integer itemCount) {
        this.itemCount = itemCount;
    }
}
