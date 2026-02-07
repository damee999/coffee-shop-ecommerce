package com.coffeeshop.coffee_shop_api.orders;
import com.coffeeshop.coffee_shop_api.products.Product;
import jakarta.persistence.*;
@Entity
@Table(name = "customer_order_item")
public class CustomerOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    private CustomerOrder order;
    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;
    @Column(nullable = false)
    private Integer qty;
    @Column(name = "unit_price_cents", nullable = false)
    private Integer unitPriceCents;
    // getters/setters
    public Long getId() {
        return id;
    }
    public CustomerOrder getOrder() {
        return order;
    }
    public void setOrder(CustomerOrder order) {
        this.order = order;
    }
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }
    public Integer getQty() {
        return qty;
    }
    public void setQty(Integer qty) {
        this.qty = qty;
    }
    public Integer getUnitPriceCents() {
        return unitPriceCents;
    }
    public void setUnitPriceCents(Integer unitPriceCents) {
        this.unitPriceCents = unitPriceCents;
    }
}
