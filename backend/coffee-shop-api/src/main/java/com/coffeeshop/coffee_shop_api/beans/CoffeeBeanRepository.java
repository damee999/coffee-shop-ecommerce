package com.coffeeshop.coffee_shop_api.beans;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CoffeeBeanRepository extends JpaRepository<CoffeeBean, Long> {
    List<CoffeeBean> findByActiveTrueOrderByIdAsc();
}
