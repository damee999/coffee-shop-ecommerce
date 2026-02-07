package com.coffeeshop.coffee_shop_api.orders;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "customer_order")
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 20)
    private String status = "PLACED";
    @Column(name = "total_cents", nullable = false)
    private Integer totalCents;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomerOrderItem> items = new ArrayList<>();
    public void addItem(CustomerOrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
    // getters/setters
    public Long getId() {
        return id;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Integer getTotalCents() {
        return totalCents;
    }
    public void setTotalCents(Integer totalCents) {
        this.totalCents = totalCents;
    }
    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public List<CustomerOrderItem> getItems() {
        return items;
    }
}
