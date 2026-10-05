package com.project.backend.infrastructure.config;

import com.project.backend.domain.gateway.PasswordEncoderPort;
import com.project.backend.domain.gateway.ViaCepGatewayPort;
import com.project.backend.domain.repository.AddressRepositoryPort;
import com.project.backend.domain.repository.UserRepositoryPort;
import com.project.backend.usecase.address.FindZipCodeUseCase;
import com.project.backend.usecase.address.CreateAddressUseCase;
import com.project.backend.usecase.address.DeleteAddressUseCase;
import com.project.backend.usecase.address.FindAddressUseCase;
import com.project.backend.usecase.address.UpdateAddressUseCase;
import com.project.backend.usecase.user.CreateUserUseCase;
import com.project.backend.usecase.user.FindUserUseCase;
import com.project.backend.usecase.user.LoginUserUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {

    @Bean
    public CreateUserUseCase createUserUseCase(UserRepositoryPort userRepository, PasswordEncoderPort passwordEncoder) {
        return new CreateUserUseCase(userRepository, passwordEncoder);
    }

    @Bean
    public FindUserUseCase findUserUseCase(UserRepositoryPort userRepository) {
        return new FindUserUseCase(userRepository);
    }

    @Bean
    public LoginUserUseCase loginUserUseCase(UserRepositoryPort userRepository, PasswordEncoderPort passwordEncoder) {
        return new LoginUserUseCase(userRepository, passwordEncoder);
    }

    @Bean
    public CreateAddressUseCase createAddressUseCase(AddressRepositoryPort addressRepository) {
        return new CreateAddressUseCase(addressRepository);
    }

    @Bean
    public UpdateAddressUseCase updateAddressUseCase(AddressRepositoryPort addressRepository) {
        return new UpdateAddressUseCase(addressRepository);
    }

    @Bean
    public DeleteAddressUseCase deleteAddressUseCase(AddressRepositoryPort addressRepository) {
        return new DeleteAddressUseCase(addressRepository);
    }

    @Bean
    public FindZipCodeUseCase findZipCodeUseCase(ViaCepGatewayPort viaCepGateway) {
        return new FindZipCodeUseCase(viaCepGateway);
    }

    @Bean
    public FindAddressUseCase findAddressUseCase(AddressRepositoryPort addressRepository) {
        return new FindAddressUseCase(addressRepository);
    }
}
