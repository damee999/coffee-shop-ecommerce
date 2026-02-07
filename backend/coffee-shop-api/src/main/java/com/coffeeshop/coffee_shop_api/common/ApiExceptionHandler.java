package com.coffeeshop.coffee_shop_api.common;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.stream.Collectors;
@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> notFound(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "timestamp", OffsetDateTime.now().toString(),
                "status", 404,
                "error", "Not Found",
                "message", ex.getMessage()));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validation(MethodArgumentNotValidException ex) {
        var errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        e -> e.getField(),
                        e -> e.getDefaultMessage(),
                        (a, b) -> a));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                "timestamp", OffsetDateTime.now().toString(),
                "status", 400,
                "error", "Bad Request",
                "message", "Validation failed",
                "fields", errors));
    }
}
