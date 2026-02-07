package com.coffeeshop.coffee_shop_api.products;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) {
        this.service = service;
    }
    @GetMapping
    public List<ProductDto> listActive() {
        return service.listActive();
    }
    @GetMapping("/{id}")
    public ProductDto getById(@PathVariable long id) {
        return service.getById(id);
    }
    @PostMapping
    public ProductDto create(@Valid @RequestBody CreateProductRequest req) {
        return service.create(req);
    }
    @PutMapping("/{id}")
    public ProductDto update(@PathVariable long id, @Valid @RequestBody UpdateProductRequest req) {
        return service.update(id, req);
    }
    @PatchMapping("/{id}/deactivate")
    public void deactivate(@PathVariable long id) {
        service.deactivate(id);
    }
}
