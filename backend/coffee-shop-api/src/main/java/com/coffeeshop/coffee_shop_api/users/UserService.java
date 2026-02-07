package com.coffeeshop.coffee_shop_api.users;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.Optional;
@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public UserDto register(RegisterRequest request) throws Exception {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new Exception("Email already in use");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, use BCryptPasswordEncoder
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setActive(true);
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());
        User savedUser = userRepository.save(user);
        return new UserDto(savedUser);
    }
    public UserDto login(LoginRequest request) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }
        User user = userOpt.get();
        // In production, use BCryptPasswordEncoder to verify password
        if (!user.getPassword().equals(request.getPassword())) {
            throw new Exception("Invalid password");
        }
        return new UserDto(user);
    }
    public UserDto getUserById(Long id) throws Exception {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }
        return new UserDto(userOpt.get());
    }
    public UserDto updateUser(Long id, UserDto updateRequest) throws Exception {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }
        User user = userOpt.get();
        if (updateRequest.getFirstName() != null)
            user.setFirstName(updateRequest.getFirstName());
        if (updateRequest.getLastName() != null)
            user.setLastName(updateRequest.getLastName());
        if (updateRequest.getPhone() != null)
            user.setPhone(updateRequest.getPhone());
        if (updateRequest.getAddress() != null)
            user.setAddress(updateRequest.getAddress());
        if (updateRequest.getCity() != null)
            user.setCity(updateRequest.getCity());
        if (updateRequest.getZipCode() != null)
            user.setZipCode(updateRequest.getZipCode());
        user.setUpdatedAt(OffsetDateTime.now());
        User updatedUser = userRepository.save(user);
        return new UserDto(updatedUser);
    }
}
