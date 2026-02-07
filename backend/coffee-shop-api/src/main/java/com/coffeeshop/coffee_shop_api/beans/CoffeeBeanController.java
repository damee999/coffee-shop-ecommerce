package com.coffeeshop.coffee_shop_api.beans;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/beans")
@CrossOrigin(origins = "http://localhost:4200") // for Angular dev
public class CoffeeBeanController {
    private final CoffeeBeanService service;
    public CoffeeBeanController(CoffeeBeanService service) {
        this.service = service;
    }
    @GetMapping
    public List<CoffeeBeanDto> listActive() {
        return service.listActive();
    }
    @GetMapping("/{id}")
    public CoffeeBeanDto getById(@PathVariable long id) {
        return service.getById(id);
    }
    @PostMapping
    public CoffeeBeanDto create(@Valid @RequestBody CreateCoffeeBeanRequest req) {
        return service.create(req);
    }
    @PutMapping("/{id}")
    public CoffeeBeanDto update(@PathVariable long id, @Valid @RequestBody UpdateCoffeeBeanRequest req) {
        return service.update(id, req);
    }
    @PatchMapping("/{id}/deactivate")
    public void deactivate(@PathVariable long id) {
        service.deactivate(id);
    }
}
