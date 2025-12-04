package org.example.task_manager.dtos.user;

public record UserDto(Long id,
                      String displayName,
                      String email
) {
}

