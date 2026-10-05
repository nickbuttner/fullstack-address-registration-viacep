package com.project.backend.infrastructure.persistence.adapter;

import com.project.backend.domain.model.Address;
import com.project.backend.domain.repository.AddressRepositoryPort;
import com.project.backend.infrastructure.persistence.entity.AddressEntity;
import com.project.backend.infrastructure.persistence.entity.UserEntity;
import com.project.backend.infrastructure.persistence.repository.AddressJpaRepository;
import com.project.backend.infrastructure.persistence.repository.UserJpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component
public class AddressRepositoryAdapter implements AddressRepositoryPort {

    private final AddressJpaRepository addressJpaRepository;
    private final UserJpaRepository userJpaRepository;

    public AddressRepositoryAdapter(AddressJpaRepository addressJpaRepository, UserJpaRepository userJpaRepository) {
        this.addressJpaRepository = addressJpaRepository;
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    @Transactional
    public Address save(Address address) {
        AddressEntity entity = address.getId() != null
                ? addressJpaRepository.findById(address.getId()).orElseGet(AddressEntity::new)
                : new AddressEntity();
        UserEntity user = userJpaRepository.findById(address.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        entity.setZipCode(address.getZipCode());
        entity.setStreet(address.getStreet());
        entity.setNeighborhood(address.getNeighborhood());
        entity.setCity(address.getCity());
        entity.setState(address.getState());
        entity.setNumber(address.getNumber());
        entity.setComplement(address.getComplement());
        entity.setIsMainAddress(address.getIsMainAddress());
        entity.setUser(user);
        return toDomain(addressJpaRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Address> findById(Long id) {
        return addressJpaRepository.findById(id).map(AddressRepositoryAdapter::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Address> findByUserId(Long userId) {
        return addressJpaRepository.findByUserId(userId).stream()
                .map(AddressRepositoryAdapter::toDomain)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Address> findMainAddressByUserId(Long userId) {
        return addressJpaRepository.findByUserIdAndIsMainAddressTrue(userId).map(AddressRepositoryAdapter::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        addressJpaRepository.deleteById(id);
    }

    public static Address toDomain(AddressEntity entity) {
        return new Address(
                entity.getId(),
                entity.getZipCode(),
                entity.getStreet(),
                entity.getNeighborhood(),
                entity.getCity(),
                entity.getState(),
                entity.getNumber(),
                entity.getComplement(),
                entity.getIsMainAddress(),
                entity.getUser() != null ? entity.getUser().getId() : null
        );
    }
}
