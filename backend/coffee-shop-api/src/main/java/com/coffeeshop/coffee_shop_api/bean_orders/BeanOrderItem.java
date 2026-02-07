package com.coffeeshop.coffee_shop_api.bean_orders;
import com.coffeeshop.coffee_shop_api.beans.CoffeeBean;
import jakarta.persistence.*;
@Entity
@Table(name = "bean_order_item")
public class BeanOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    private BeanOrder order;
    @ManyToOne(optional = false)
    @JoinColumn(name = "bean_id")
    private CoffeeBean bean;
    @Column(nullable = false)
    private Integer qty;
    @Column(name = "unit_price_cents", nullable = false)
    private Integer unitPriceCents;
    public void setOrder(BeanOrder order) {
        this.order = order;
    }
    public void setBean(CoffeeBean bean) {
        this.bean = bean;
    }
    public void setQty(Integer qty) {
        this.qty = qty;
    }
    public void setUnitPriceCents(Integer unitPriceCents) {
        this.unitPriceCents = unitPriceCents;
    }
    public Integer getQty() {
        return qty;
    }
    public Integer getUnitPriceCents() {
        return unitPriceCents;
    }
    public CoffeeBean getBean() {
        return bean;
    }
}
