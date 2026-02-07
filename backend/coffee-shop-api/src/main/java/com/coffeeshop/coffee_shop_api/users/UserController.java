package com.coffeeshop.coffee_shop_api.users;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            UserDto userDto = userService.register(request);
            return ResponseEntity.ok(new AuthResponse(userDto, "Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            UserDto userDto = userService.login(request);
            return ResponseEntity.ok(new AuthResponse(userDto, "Login successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        try {
            UserDto userDto = userService.getUserById(id);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDto updateRequest) {
        try {
            UserDto updatedUser = userService.updateUser(id, updateRequest);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
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
}
