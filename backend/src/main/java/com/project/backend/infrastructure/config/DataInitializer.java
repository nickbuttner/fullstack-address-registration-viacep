package com.project.backend.infrastructure.config;

import com.project.backend.domain.model.Role;
import com.project.backend.domain.model.User;
import com.project.backend.domain.repository.UserRepositoryPort;
import com.project.backend.usecase.user.CreateUserUseCase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedUsers(
            UserRepositoryPort userRepository,
            CreateUserUseCase createUserUseCase,
            @Value("${app.seed.admin.password:}") String adminPassword,
            @Value("${app.seed.user.password:}") String userPassword
    ) {
        return args -> {
            seedUser(
                    userRepository,
                    createUserUseCase,
                    "Administrador",
                    "39053344705",
                    LocalDate.of(1990, 1, 1),
                    adminPassword,
                    Role.ADMIN
            );
            seedUser(
                    userRepository,
                    createUserUseCase,
                    "Usuário Comum",
                    "52998224725",
                    LocalDate.of(1995, 5, 20),
                    userPassword,
                    Role.USER
            );
        };
    }

    private void seedUser(
            UserRepositoryPort userRepository,
            CreateUserUseCase createUserUseCase,
            String name,
            String cpf,
            LocalDate birthDate,
            String password,
            Role role
    ) {
        if (password == null || password.isBlank()) {
            return;
        }
        userRepository.findByCpf(cpf).ifPresentOrElse(
                existing -> {
                    if (!name.equals(existing.getName())) {
                        userRepository.save(new User(
                                existing.getId(),
                                name,
                                existing.getCpf(),
                                existing.getBirthDate(),
                                existing.getPassword(),
                                existing.getRole()
                        ));
                    }
                },
                () -> createUserUseCase.execute(name, cpf, birthDate, password, role)
        );
    }
}
