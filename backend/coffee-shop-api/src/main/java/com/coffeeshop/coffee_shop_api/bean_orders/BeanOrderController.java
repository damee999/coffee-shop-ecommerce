package com.coffeeshop.coffee_shop_api.bean_orders;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/bean-orders")
public class BeanOrderController {
    private final BeanOrderService service;
    public BeanOrderController(BeanOrderService service) {
        this.service = service;
    }
    @PostMapping
    public CreateBeanOrderResponse create(@RequestBody CreateBeanOrderRequest req) {
        return service.create(req);
    }
}
