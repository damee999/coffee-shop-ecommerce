package com.coffeeshop.coffee_shop_api.bean_orders;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "bean_order")
public class BeanOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "total_cents", nullable = false)
    private Integer totalCents;
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BeanOrderItem> items = new ArrayList<>();
    public void addItem(BeanOrderItem item) {
        item.setOrder(this);
        items.add(item);
    }
    public Long getId() {
        return id;
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
    public List<BeanOrderItem> getItems() {
        return items;
    }
}
