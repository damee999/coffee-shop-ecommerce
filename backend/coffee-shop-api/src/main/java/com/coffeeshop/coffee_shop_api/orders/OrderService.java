package com.coffeeshop.coffee_shop_api.orders;
import com.coffeeshop.coffee_shop_api.common.NotFoundException;
import com.coffeeshop.coffee_shop_api.products.Product;
import com.coffeeshop.coffee_shop_api.products.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class OrderService {
    private final CustomerOrderRepository orderRepo;
    private final ProductRepository productRepo;
    public OrderService(CustomerOrderRepository orderRepo, ProductRepository productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }
    @Transactional
    public CreateOrderResponse create(CreateOrderRequest req) {
        if (req.items() == null || req.items().isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }
        CustomerOrder order = new CustomerOrder();
        int total = 0;
        for (CreateOrderRequest.Item i : req.items()) {
            Product p = productRepo.findById(i.productId())
                    .orElseThrow(() -> new NotFoundException("Product not found: " + i.productId()));
            int qty = (i.qty() == null ? 0 : i.qty());
            if (qty <= 0) continue;
            CustomerOrderItem item = new CustomerOrderItem();
            item.setProduct(p);
            item.setQty(qty);
            item.setUnitPriceCents(p.getPriceCents());
            order.addItem(item);
            total += p.getPriceCents() * qty;
        }
        order.setTotalCents(total);
        CustomerOrder saved = orderRepo.save(order);
        return new CreateOrderResponse(saved.getId(), saved.getTotalCents());
    }
}
