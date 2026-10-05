package com.project.backend.usecase.user;

import com.project.backend.domain.gateway.PasswordEncoderPort;
import com.project.backend.domain.model.Cpf;
import com.project.backend.domain.model.Role;
import com.project.backend.domain.model.User;
import com.project.backend.domain.repository.UserRepositoryPort;

import java.time.LocalDate;

public class CreateUserUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordEncoderPort passwordEncoder;

    public CreateUserUseCase(UserRepositoryPort userRepository, PasswordEncoderPort passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User execute(String name, String cpf, LocalDate birthDate, String password, Role role) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório.");
        }
        if (birthDate == null || birthDate.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data de nascimento inválida.");
        }
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("A senha deve ter pelo menos 8 caracteres.");
        }

        Cpf validCpf = new Cpf(cpf);
        if (userRepository.existsByCpf(validCpf.getValue())) {
            throw new IllegalArgumentException(
                    "Não foi possível concluir o cadastro com os dados informados. Verifique os dados ou tente fazer login.");
        }

        Role assignedRole = role == null ? Role.USER : role;
        return userRepository.save(new User(
                null,
                name.trim(),
                validCpf.getValue(),
                birthDate,
                passwordEncoder.encode(password),
                assignedRole
        ));
    }
}
