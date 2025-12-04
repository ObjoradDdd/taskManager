package org.example.task_manager.mappers;

import org.example.task_manager.dtos.user.UserDto;
import org.example.task_manager.dtos.auth.CustomUserDetails;
import org.example.task_manager.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getDisplayName(),
                user.getEmail()
        );
    }

    public CustomUserDetails toCustomUserDetails(User user) {
        return new CustomUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPasswordHash()
        );
    }
}
