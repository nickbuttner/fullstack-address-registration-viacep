package com.project.backend.web.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "CPF é obrigatório.") String cpf,
        @NotBlank(message = "Senha é obrigatória.") String password
) {
}
