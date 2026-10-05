package com.project.backend.infrastructure.security;

import com.project.backend.domain.model.Role;

public record AuthenticatedUser(Long id, String cpf, Role role) {

    public boolean isAdmin() {
        return role == Role.ADMIN;
    }
}
