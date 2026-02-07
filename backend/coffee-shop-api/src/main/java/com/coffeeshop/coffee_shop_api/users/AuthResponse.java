package com.coffeeshop.coffee_shop_api.users;
public class AuthResponse {
    private UserDto user;
    private String message;
    public AuthResponse(UserDto user, String message) {
        this.user = user;
        this.message = message;
    }
    public UserDto getUser() {
        return user;
    }
    public void setUser(UserDto user) {
        this.user = user;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
