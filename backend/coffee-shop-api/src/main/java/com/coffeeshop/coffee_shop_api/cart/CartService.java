package com.coffeeshop.coffee_shop_api.cart;
import org.springframework.stereotype.Service;
import com.coffeeshop.coffee_shop_api.products.Product;
import com.coffeeshop.coffee_shop_api.products.ProductRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    public CartService(CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }
    public CartDto getCart(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        List<CartItemDto> itemDtos = items.stream()
                .map(CartItemDto::new)
                .collect(Collectors.toList());
        return new CartDto(userId, itemDtos);
    }
    public CartItemDto addToCart(Long userId, Long productId, Integer quantity) throws Exception {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            throw new Exception("Product not found");
        }
        Product product = productOpt.get();
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId);
        CartItem cartItem;
        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem(userId, product, quantity);
        }
        CartItem savedItem = cartItemRepository.save(cartItem);
        return new CartItemDto(savedItem);
    }
    public CartItemDto updateCartItem(Long userId, Long cartItemId, Integer quantity) throws Exception {
        Optional<CartItem> itemOpt = cartItemRepository.findById(cartItemId);
        if (itemOpt.isEmpty() || !itemOpt.get().getUserId().equals(userId)) {
            throw new Exception("Cart item not found");
        }
        CartItem cartItem = itemOpt.get();
        if (quantity <= 0) {
            throw new Exception("Quantity must be greater than 0");
        }
        cartItem.setQuantity(quantity);
        CartItem updated = cartItemRepository.save(cartItem);
        return new CartItemDto(updated);
    }
    public void removeFromCart(Long userId, Long cartItemId) throws Exception {
        Optional<CartItem> itemOpt = cartItemRepository.findById(cartItemId);
        if (itemOpt.isEmpty() || !itemOpt.get().getUserId().equals(userId)) {
            throw new Exception("Cart item not found");
        }
        cartItemRepository.deleteById(cartItemId);
    }
    public void clearCart(Long userId) {
        try {
            List<CartItem> items = cartItemRepository.findByUserId(userId);
            if (!items.isEmpty()) {
                cartItemRepository.deleteAll(items);
                System.out.println("✓ Cart cleared for userId: " + userId + ", deleted " + items.size() + " items");
            } else {
                System.out.println("Cart was already empty for userId: " + userId);
            }
        } catch (Exception e) {
            System.err.println("Error clearing cart: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to clear cart: " + e.getMessage());
        }
    }
}
