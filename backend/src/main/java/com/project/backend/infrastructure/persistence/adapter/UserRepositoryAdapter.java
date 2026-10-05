package com.project.backend.infrastructure.persistence.adapter;

import com.project.backend.domain.model.User;
import com.project.backend.domain.repository.UserRepositoryPort;
import com.project.backend.infrastructure.persistence.entity.UserEntity;
import com.project.backend.infrastructure.persistence.repository.UserJpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final UserJpaRepository userJpaRepository;

    public UserRepositoryAdapter(UserJpaRepository userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    @Transactional
    public User save(User user) {
        UserEntity entity = user.getId() != null
                ? userJpaRepository.findById(user.getId()).orElseGet(UserEntity::new)
                : new UserEntity();
        entity.setName(user.getName());
        entity.setCpf(user.getCpf());
        entity.setBirthDate(user.getBirthDate());
        entity.setPassword(user.getPassword());
        entity.setRole(user.getRole());
        return toDomain(userJpaRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userJpaRepository.findById(id).map(UserRepositoryAdapter::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByCpf(String cpf) {
        return userJpaRepository.findByCpf(cpf).map(UserRepositoryAdapter::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userJpaRepository.findAll().stream()
                .map(UserRepositoryAdapter::toDomain)
                .toList();
    }

    @Override
    public boolean existsByCpf(String cpf) {
        return userJpaRepository.existsByCpf(cpf);
    }

    public static User toDomain(UserEntity entity) {
        return new User(
                entity.getId(),
                entity.getName(),
                entity.getCpf(),
                entity.getBirthDate(),
                entity.getPassword(),
                entity.getRole()
        );
    }
}
