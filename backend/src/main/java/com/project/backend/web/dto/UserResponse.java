package com.project.backend.web.dto;

import com.project.backend.domain.model.Role;
import com.project.backend.domain.model.User;

import java.time.LocalDate;

public record UserResponse(
        Long id,
        String name,
        String cpf,
        LocalDate birthDate,
        Role role
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getCpf(),
                user.getBirthDate(),
                user.getRole()
        );
    }
}
