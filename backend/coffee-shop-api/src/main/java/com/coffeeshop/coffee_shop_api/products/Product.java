package com.coffeeshop.coffee_shop_api.products;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 200)
    private String name;
    @Column(length = 500)
    private String description;
    @Column(name = "price_cents", nullable = false)
    private Integer priceCents;
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    @Column(nullable = false)
    private Boolean active = true;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
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
    public Boolean getActive() {
        return active;
    }
    public void setActive(Boolean active) {
        this.active = active;
    }
    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
