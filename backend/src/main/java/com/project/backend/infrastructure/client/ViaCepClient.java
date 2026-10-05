package com.project.backend.infrastructure.client;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ViaCepClient {

    private final RestTemplate restTemplate;

    public ViaCepClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable("zipCodes")
    public ViaCepResponse findByZipCode(String zipCode) {
        ViaCepResponse response = restTemplate.getForObject(
                "https://viacep.com.br/ws/{zipCode}/json/",
                ViaCepResponse.class,
                zipCode
        );
        if (response == null || Boolean.TRUE.equals(response.getError())) {
            throw new IllegalArgumentException("CEP não encontrado.");
        }
        return response;
    }
}
