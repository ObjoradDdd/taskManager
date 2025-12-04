package org.example.task_manager.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank(message = "Email не может быть пустым")
        @Email(message = "Некорректный формат email")
        String email,
        @NotBlank(message = "DisplayName не может быть пустым")
        String displayName,
        @NotBlank(message = "Password не может быть пустым")
        String password
) {
}
