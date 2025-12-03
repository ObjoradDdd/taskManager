package org.example.task_manager.dtos.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Email не может быть пустым")
        String userName,
        @NotBlank(message = "Password не может быть пустым")
        String password
) {
}
