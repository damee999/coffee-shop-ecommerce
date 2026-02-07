package com.coffeeshop.coffee_shop_api.cart;
import com.coffeeshop.coffee_shop_api.products.Product;
public class CartItemDto {
    private Long id;
    private Long productId;
    private String productName;
    private Integer priceCents;
    private String imageUrl;
    private Integer quantity;
    private Integer totalCents;
    public CartItemDto() {
    }
    public CartItemDto(CartItem cartItem) {
        this.id = cartItem.getId();
        this.productId = cartItem.getProduct().getId();
        this.productName = cartItem.getProduct().getName();
        this.priceCents = cartItem.getProduct().getPriceCents();
        this.imageUrl = cartItem.getProduct().getImageUrl();
        this.quantity = cartItem.getQuantity();
        this.totalCents = cartItem.getProduct().getPriceCents() * cartItem.getQuantity();
    }
    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getProductId() {
        return productId;
    }
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public Integer getPriceCents() {
        return priceCents;
    }
    public void setPriceCents(Integer priceCents) {
        this.priceCents = priceCents;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Integer getTotalCents() {
        return totalCents;
    }
    public void setTotalCents(Integer totalCents) {
        this.totalCents = totalCents;
    }
}
