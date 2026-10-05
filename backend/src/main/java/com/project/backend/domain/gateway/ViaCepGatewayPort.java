package com.project.backend.domain.gateway;

import com.project.backend.domain.model.ZipCodeInfo;

public interface ViaCepGatewayPort {

    ZipCodeInfo findByZipCode(String zipCode);
}
