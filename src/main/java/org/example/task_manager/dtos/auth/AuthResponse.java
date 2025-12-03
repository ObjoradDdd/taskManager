package org.example.task_manager.dtos.auth;

public record AuthResponse(
        String accessToken,
        String refreshToken
) {
}
