package com.project.backend.domain.repository;

import com.project.backend.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryPort {

    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByCpf(String cpf);

    List<User> findAll();

    boolean existsByCpf(String cpf);
}
