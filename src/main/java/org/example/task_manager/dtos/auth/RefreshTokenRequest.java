package org.example.task_manager.dtos.auth;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenRequest(@NotBlank(message = "RefreshToken не может быть пустым") String refreshToken) {
}
