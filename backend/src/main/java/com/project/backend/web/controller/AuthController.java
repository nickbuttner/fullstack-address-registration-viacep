package com.project.backend.web.controller;

import com.project.backend.domain.model.Role;
import com.project.backend.domain.model.User;
import com.project.backend.infrastructure.security.JwtTokenProvider;
import com.project.backend.usecase.user.CreateUserUseCase;
import com.project.backend.usecase.user.LoginUserUseCase;
import com.project.backend.web.dto.AuthResponse;
import com.project.backend.web.dto.LoginRequest;
import com.project.backend.web.dto.RegisterRequest;
import com.project.backend.web.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CreateUserUseCase createUserUseCase;
    private final LoginUserUseCase loginUserUseCase;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(
            CreateUserUseCase createUserUseCase,
            LoginUserUseCase loginUserUseCase,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.createUserUseCase = createUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        User user = createUserUseCase.execute(
                request.name(),
                request.cpf(),
                request.birthDate(),
                request.password(),
                request.role() != null ? request.role() : Role.USER
        );
        return toAuth(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        User user = loginUserUseCase.execute(request.cpf(), request.password());
        return toAuth(user);
    }

    private AuthResponse toAuth(User user) {
        String token = jwtTokenProvider.generateToken(user.getId(), user.getCpf(), user.getRole().name());
        return AuthResponse.bearer(token, UserResponse.from(user));
    }
}
