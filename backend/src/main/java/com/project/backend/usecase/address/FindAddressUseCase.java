package com.project.backend.usecase.address;

import com.project.backend.domain.model.Address;
import com.project.backend.domain.repository.AddressRepositoryPort;

import java.util.List;

public class FindAddressUseCase {

    private final AddressRepositoryPort addressRepository;

    public FindAddressUseCase(AddressRepositoryPort addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address byId(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Endereço não encontrado."));
    }

    public List<Address> byUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }
}
