package com.coffeeshop.coffee_shop_api.orders;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service) {
        this.service = service;
    }
    @GetMapping("/ping")
    public String ping() {
        return "orders ok";
    }
    @PostMapping
    public CreateOrderResponse create(@RequestBody CreateOrderRequest req) {
        return service.create(req);
    }
}
