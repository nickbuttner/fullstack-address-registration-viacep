package com.project.backend.usecase.address;

import com.project.backend.domain.model.Address;
import com.project.backend.domain.repository.AddressRepositoryPort;

import java.util.List;

public class CreateAddressUseCase {

    private final AddressRepositoryPort addressRepository;

    public CreateAddressUseCase(AddressRepositoryPort addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address execute(Address address) {
        List<Address> existing = addressRepository.findByUserId(address.getUserId());
        if (existing.isEmpty()) {
            address.setIsMainAddress(true);
        } else if (Boolean.TRUE.equals(address.getIsMainAddress())) {
            addressRepository.findMainAddressByUserId(address.getUserId()).ifPresent(previous -> {
                previous.setIsMainAddress(false);
                addressRepository.save(previous);
            });
        }
        return addressRepository.save(address);
    }
}
