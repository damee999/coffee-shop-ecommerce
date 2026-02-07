package com.coffeeshop.coffee_shop_api.beans;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
@Entity
@Table(name = "coffee_bean")
public class CoffeeBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 200)
    private String name;
    @Column(nullable = false, length = 200)
    private String origin;
    @Column(nullable = false, length = 20)
    private String roast; // keep string for speed; we can convert to enum later
    @Column(name = "tasting_notes", length = 400)
    private String tastingNotes;
    @Column(name = "price_cents", nullable = false)
    private Integer priceCents;
    @Column(name = "weight_g", nullable = false)
    private Integer weightG;
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    @Column(nullable = false)
    private Boolean active = true;
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;
    // --- getters/setters (generate with VS Code) ---
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
    public String getOrigin() {
        return origin;
    }
    public void setOrigin(String origin) {
        this.origin = origin;
    }
    public String getRoast() {
        return roast;
    }
    public void setRoast(String roast) {
        this.roast = roast;
    }
    public String getTastingNotes() {
        return tastingNotes;
    }
    public void setTastingNotes(String tastingNotes) {
        this.tastingNotes = tastingNotes;
    }
    public Integer getPriceCents() {
        return priceCents;
    }
    public void setPriceCents(Integer priceCents) {
        this.priceCents = priceCents;
    }
    public Integer getWeightG() {
        return weightG;
    }
    public void setWeightG(Integer weightG) {
        this.weightG = weightG;
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
