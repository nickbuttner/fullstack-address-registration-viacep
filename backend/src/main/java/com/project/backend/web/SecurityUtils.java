package com.project.backend.web;

import com.project.backend.infrastructure.security.AuthenticatedUser;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {
    }

    public static AuthenticatedUser currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AuthenticatedUser user)) {
            throw new AccessDeniedException("Não autenticado.");
        }
        return user;
    }

    public static void assertCanAccessUser(Long userId) {
        AuthenticatedUser current = currentUser();
        if (!current.isAdmin() && !current.id().equals(userId)) {
            throw new AccessDeniedException("Acesso negado.");
        }
    }
}
