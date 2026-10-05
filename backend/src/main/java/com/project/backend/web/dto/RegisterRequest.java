package com.project.backend.web.dto;

import com.project.backend.domain.model.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record RegisterRequest(
        @NotBlank(message = "Nome é obrigatório.") String name,
        @NotBlank(message = "CPF é obrigatório.") String cpf,
        @NotNull(message = "Data de nascimento é obrigatória.")
        @Past(message = "Data de nascimento inválida.")
        LocalDate birthDate,
        @NotBlank(message = "Senha é obrigatória.")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
                message = "A senha deve ter no mínimo 8 caracteres, com 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial."
        )
        String password,
        Role role
) {
}
