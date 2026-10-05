package com.project.backend.web.dto;

import com.project.backend.domain.model.ZipCodeInfo;

public record ZipCodeResponse(String zipCode, String street, String neighborhood, String city, String state) {

    public static ZipCodeResponse from(ZipCodeInfo info) {
        return new ZipCodeResponse(info.getZipCode(), info.getStreet(), info.getNeighborhood(), info.getCity(), info.getState());
    }
}
