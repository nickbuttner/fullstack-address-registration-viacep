package com.project.backend.usecase.user;

import com.project.backend.domain.gateway.PasswordEncoderPort;
import com.project.backend.domain.model.Cpf;
import com.project.backend.domain.model.User;
import com.project.backend.domain.repository.UserRepositoryPort;

public class LoginUserUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordEncoderPort passwordEncoder;

    public LoginUserUseCase(UserRepositoryPort userRepository, PasswordEncoderPort passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User execute(String cpf, String password) {
        String digits;
        try {
            digits = new Cpf(cpf).getValue();
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Credenciais inválidas.");
        }
        User user = userRepository.findByCpf(digits)
                .orElseThrow(() -> new IllegalArgumentException("Credenciais inválidas."));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Credenciais inválidas.");
        }
        return user;
    }
}
