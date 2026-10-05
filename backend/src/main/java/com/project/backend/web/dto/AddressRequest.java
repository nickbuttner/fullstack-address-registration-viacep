package com.project.backend.web.dto;

import com.project.backend.domain.model.Address;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddressRequest(
        @NotBlank(message = "CEP é obrigatório.") String zipCode,
        @NotBlank(message = "Logradouro é obrigatório.") String street,
        @NotBlank(message = "Bairro é obrigatório.") String neighborhood,
        @NotBlank(message = "Cidade é obrigatória.") String city,
        @NotBlank(message = "Estado é obrigatório.") String state,
        @NotBlank(message = "Número é obrigatório.") String number,
        String complement,
        Boolean isMainAddress,
        @NotNull(message = "Usuário é obrigatório.") Long userId
) {
    public Address toDomain() {
        return new Address(
                null,
                zipCode.replaceAll("\\D", ""),
                street,
                neighborhood,
                city,
                state,
                number,
                complement,
                isMainAddress,
                userId
        );
    }
}
