package com.coffeeshop.coffee_shop_api.bean_orders;
import com.coffeeshop.coffee_shop_api.beans.CoffeeBean;
import com.coffeeshop.coffee_shop_api.beans.CoffeeBeanRepository;
import com.coffeeshop.coffee_shop_api.common.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class BeanOrderService {
    private final BeanOrderRepository orderRepo;
    private final CoffeeBeanRepository beanRepo;
    public BeanOrderService(BeanOrderRepository orderRepo, CoffeeBeanRepository beanRepo) {
        this.orderRepo = orderRepo;
        this.beanRepo = beanRepo;
    }
    @Transactional
    public CreateBeanOrderResponse create(CreateBeanOrderRequest req) {
        if (req.items() == null || req.items().isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }
        BeanOrder order = new BeanOrder();
        int total = 0;
        for (CreateBeanOrderRequest.Item i : req.items()) {
            int qty = (i.qty() == null ? 0 : i.qty());
            if (qty <= 0)
                continue;
            CoffeeBean bean = beanRepo.findById(i.beanId())
                    .orElseThrow(() -> new NotFoundException("Bean not found: " + i.beanId()));
            BeanOrderItem item = new BeanOrderItem();
            item.setBean(bean);
            item.setQty(qty);
            item.setUnitPriceCents(bean.getPriceCents());
            order.addItem(item);
            total += bean.getPriceCents() * qty;
        }
        order.setTotalCents(total);
        BeanOrder saved = orderRepo.save(order);
        return new CreateBeanOrderResponse(saved.getId(), saved.getTotalCents());
    }
}
