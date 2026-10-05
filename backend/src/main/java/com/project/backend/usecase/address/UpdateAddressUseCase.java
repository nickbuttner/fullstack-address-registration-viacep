package com.project.backend.usecase.address;

import com.project.backend.domain.model.Address;
import com.project.backend.domain.repository.AddressRepositoryPort;

public class UpdateAddressUseCase {

    private final AddressRepositoryPort addressRepository;

    public UpdateAddressUseCase(AddressRepositoryPort addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address execute(Long addressId, Address data) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Endereço não encontrado."));

        boolean becomesMainAddress = Boolean.TRUE.equals(data.getIsMainAddress())
                && !Boolean.TRUE.equals(address.getIsMainAddress());

        address.update(
                data.getZipCode(),
                data.getStreet(),
                data.getNeighborhood(),
                data.getCity(),
                data.getState(),
                data.getNumber(),
                data.getComplement(),
                data.getIsMainAddress()
        );

        if (becomesMainAddress) {
            addressRepository.findMainAddressByUserId(address.getUserId()).ifPresent(previous -> {
                if (!previous.getId().equals(address.getId())) {
                    previous.setIsMainAddress(false);
                    addressRepository.save(previous);
                }
            });
        }

        return addressRepository.save(address);
    }
}
