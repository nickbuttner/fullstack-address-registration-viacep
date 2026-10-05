package com.project.backend.usecase.address;

import com.project.backend.domain.model.Address;
import com.project.backend.domain.repository.AddressRepositoryPort;

import java.util.Comparator;
import java.util.List;

public class DeleteAddressUseCase {

    private final AddressRepositoryPort addressRepository;

    public DeleteAddressUseCase(AddressRepositoryPort addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void execute(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Endereço não encontrado."));
        Long userId = address.getUserId();
        boolean wasMainAddress = Boolean.TRUE.equals(address.getIsMainAddress());
        addressRepository.deleteById(addressId);
        if (wasMainAddress) {
            List<Address> remaining = addressRepository.findByUserId(userId);
            remaining.stream()
                    .min(Comparator.comparing(Address::getId))
                    .ifPresent(newMainAddress -> {
                        newMainAddress.setIsMainAddress(true);
                        addressRepository.save(newMainAddress);
                    });
        }
    }
}
