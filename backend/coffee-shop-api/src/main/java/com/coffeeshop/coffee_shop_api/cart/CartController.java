package com.coffeeshop.coffee_shop_api.cart;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?> getCart(@PathVariable Long userId) {
        try {
            CartDto cart = cartService.getCart(userId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody AddToCartRequest request) {
        try {
            CartItemDto item = cartService.addToCart(userId, request.getProductId(), request.getQuantity());
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    @PutMapping("/{userId}/item/{cartItemId}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long userId, @PathVariable Long cartItemId,
            @RequestBody UpdateCartItemRequest request) {
        try {
            CartItemDto item = cartService.updateCartItem(userId, cartItemId, request.getQuantity());
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    @DeleteMapping("/{userId}/item/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long userId, @PathVariable Long cartItemId) {
        try {
            cartService.removeFromCart(userId, cartItemId);
            return ResponseEntity.ok(new SuccessResponse("Item removed from cart"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok(new SuccessResponse("Cart cleared"));
    }
    public static class AddToCartRequest {
        private Long productId;
        private Integer quantity;
        public Long getProductId() {
            return productId;
        }
        public void setProductId(Long productId) {
            this.productId = productId;
        }
        public Integer getQuantity() {
            return quantity;
        }
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
    public static class UpdateCartItemRequest {
        private Integer quantity;
        public Integer getQuantity() {
            return quantity;
        }
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
    public static class ErrorResponse {
        private String error;
        public ErrorResponse(String error) {
            this.error = error;
        }
        public String getError() {
            return error;
        }
        public void setError(String error) {
            this.error = error;
        }
    }
    public static class SuccessResponse {
        private String message;
        public SuccessResponse(String message) {
            this.message = message;
        }
        public String getMessage() {
            return message;
        }
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
