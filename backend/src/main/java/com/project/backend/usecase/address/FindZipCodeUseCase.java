package com.project.backend.usecase.address;

import com.project.backend.domain.gateway.ViaCepGatewayPort;
import com.project.backend.domain.model.ZipCodeInfo;

public class FindZipCodeUseCase {

    private final ViaCepGatewayPort viaCepGateway;

    public FindZipCodeUseCase(ViaCepGatewayPort viaCepGateway) {
        this.viaCepGateway = viaCepGateway;
    }

    public ZipCodeInfo execute(String zipCode) {
        String digits = zipCode == null ? "" : zipCode.replaceAll("\\D", "");
        if (digits.length() != 8) {
            throw new IllegalArgumentException("CEP inválido.");
        }
        return viaCepGateway.findByZipCode(digits);
    }
}
