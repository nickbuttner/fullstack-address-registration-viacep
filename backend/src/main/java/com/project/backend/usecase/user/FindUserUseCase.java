package com.project.backend.usecase.user;

import com.project.backend.domain.model.User;
import com.project.backend.domain.repository.UserRepositoryPort;

import java.util.List;

public class FindUserUseCase {

    private final UserRepositoryPort userRepository;

    public FindUserUseCase(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    public User byId(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
    }

    public List<User> all() {
        return userRepository.findAll();
    }
}
