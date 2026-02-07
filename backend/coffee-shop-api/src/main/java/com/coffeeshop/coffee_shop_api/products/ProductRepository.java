package com.coffeeshop.coffee_shop_api.products;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrueOrderByIdAsc();
}
