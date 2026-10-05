package com.project.backend.domain.repository;

import com.project.backend.domain.model.Address;

import java.util.List;
import java.util.Optional;

public interface AddressRepositoryPort {

    Address save(Address address);

    Optional<Address> findById(Long id);

    List<Address> findByUserId(Long userId);

    Optional<Address> findMainAddressByUserId(Long userId);

    void deleteById(Long id);
}
