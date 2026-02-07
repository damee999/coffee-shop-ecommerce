package com.coffeeshop.coffee_shop_api.products;
import com.coffeeshop.coffee_shop_api.common.NotFoundException;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.List;
@Service
public class ProductService {
    private final ProductRepository repo;
    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }
    public List<ProductDto> listActive() {
        return repo.findByActiveTrueOrderByIdAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }
    public ProductDto getById(long id) {
        Product p = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found: " + id));
        return toDto(p);
    }
    public ProductDto create(CreateProductRequest req) {
        Product p = new Product();
        p.setName(req.name());
        p.setDescription(req.description());
        p.setPriceCents(req.priceCents());
        p.setImageUrl(req.imageUrl());
        p.setActive(true);
        p.setCreatedAt(OffsetDateTime.now());
        return toDto(repo.save(p));
    }
    public ProductDto update(long id, UpdateProductRequest req) {
        Product p = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found: " + id));
        p.setName(req.name());
        p.setDescription(req.description());
        p.setPriceCents(req.priceCents());
        p.setImageUrl(req.imageUrl());
        return toDto(repo.save(p));
    }
    public void deactivate(long id) {
        Product p = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found: " + id));
        p.setActive(false);
        repo.save(p);
    }
    private ProductDto toDto(Product p) {
        return new ProductDto(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPriceCents(),
                p.getImageUrl());
    }
}
