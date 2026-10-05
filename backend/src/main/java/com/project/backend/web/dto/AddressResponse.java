package com.project.backend.web.dto;

import com.project.backend.domain.model.Address;

public record AddressResponse(
        Long id,
        String zipCode,
        String street,
        String neighborhood,
        String city,
        String state,
        String number,
        String complement,
        Boolean isMainAddress,
        Long userId
) {
    public static AddressResponse from(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getZipCode(),
                address.getStreet(),
                address.getNeighborhood(),
                address.getCity(),
                address.getState(),
                address.getNumber(),
                address.getComplement(),
                address.getIsMainAddress(),
                address.getUserId()
        );
    }
}
