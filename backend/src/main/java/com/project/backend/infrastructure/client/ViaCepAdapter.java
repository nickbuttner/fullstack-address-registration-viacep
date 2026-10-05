package com.project.backend.infrastructure.client;

import com.project.backend.domain.gateway.ViaCepGatewayPort;
import com.project.backend.domain.model.ZipCodeInfo;
import org.springframework.stereotype.Component;

@Component
public class ViaCepAdapter implements ViaCepGatewayPort {

    private final ViaCepClient viaCepClient;

    public ViaCepAdapter(ViaCepClient viaCepClient) {
        this.viaCepClient = viaCepClient;
    }

    @Override
    public ZipCodeInfo findByZipCode(String zipCode) {
        ViaCepResponse response = viaCepClient.findByZipCode(zipCode);
        String zipCodeDigits = response.getZipCode() == null ? zipCode : response.getZipCode().replaceAll("\\D", "");
        return new ZipCodeInfo(
                zipCodeDigits,
                response.getStreet(),
                response.getNeighborhood(),
                response.getCity(),
                response.getState()
        );
    }
}
