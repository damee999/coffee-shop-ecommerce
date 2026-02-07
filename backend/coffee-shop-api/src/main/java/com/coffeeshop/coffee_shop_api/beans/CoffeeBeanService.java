package com.coffeeshop.coffee_shop_api.beans;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.List;
import com.coffeeshop.coffee_shop_api.common.NotFoundException;
@Service
public class CoffeeBeanService {
    private final CoffeeBeanRepository repo;
    public CoffeeBeanService(CoffeeBeanRepository repo) {
        this.repo = repo;
    }
    public List<CoffeeBeanDto> listActive() {
        return repo.findByActiveTrueOrderByIdAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }
    public CoffeeBeanDto getById(long id) {
        CoffeeBean b = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Bean not found: " + id));
        return toDto(b);
    }
    public CoffeeBeanDto create(CreateCoffeeBeanRequest req) {
        CoffeeBean b = new CoffeeBean();
        b.setName(req.name());
        b.setOrigin(req.origin());
        b.setRoast(req.roast());
        b.setTastingNotes(req.tastingNotes());
        b.setPriceCents(req.priceCents());
        b.setWeightG(req.weightG());
        b.setImageUrl(req.imageUrl());
        b.setActive(true);
        b.setCreatedAt(OffsetDateTime.now());
        return toDto(repo.save(b));
    }
    public CoffeeBeanDto update(long id, UpdateCoffeeBeanRequest req) {
        CoffeeBean b = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Bean not found: " + id));
        b.setName(req.name());
        b.setOrigin(req.origin());
        b.setRoast(req.roast());
        b.setTastingNotes(req.tastingNotes());
        b.setPriceCents(req.priceCents());
        b.setWeightG(req.weightG());
        b.setImageUrl(req.imageUrl());
        return toDto(repo.save(b));
    }
    public void deactivate(long id) {
        CoffeeBean b = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Bean not found: " + id));
        b.setActive(false);
        repo.save(b);
    }
    private CoffeeBeanDto toDto(CoffeeBean b) {
        return new CoffeeBeanDto(
                b.getId(),
                b.getName(),
                b.getOrigin(),
                b.getRoast(),
                b.getTastingNotes(),
                b.getPriceCents(),
                b.getWeightG(),
                b.getImageUrl());
    }
}
