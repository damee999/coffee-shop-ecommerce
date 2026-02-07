package com.coffeeshop.coffee_shop_api.bean_orders;
import java.util.List;
public record CreateBeanOrderRequest(List<Item> items) {
    public record Item(Long beanId, Integer qty) {
    }
}
