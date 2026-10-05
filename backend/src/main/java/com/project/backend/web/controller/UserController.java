package com.project.backend.web.controller;

import com.project.backend.domain.model.Address;
import com.project.backend.usecase.address.FindAddressUseCase;
import com.project.backend.usecase.user.FindUserUseCase;
import com.project.backend.web.SecurityUtils;
import com.project.backend.web.dto.AddressResponse;
import com.project.backend.web.dto.UserResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final FindUserUseCase findUserUseCase;
    private final FindAddressUseCase findAddressUseCase;

    public UserController(FindUserUseCase findUserUseCase, FindAddressUseCase findAddressUseCase) {
        this.findUserUseCase = findUserUseCase;
        this.findAddressUseCase = findAddressUseCase;
    }

    @GetMapping("/me")
    public UserResponse me() {
        return UserResponse.from(findUserUseCase.byId(SecurityUtils.currentUser().id()));
    }

    @GetMapping
    public List<UserResponse> list() {
        return findUserUseCase.all().stream().map(UserResponse::from).toList();
    }

    @GetMapping("/{id}")
    public UserResponse findById(@PathVariable Long id) {
        SecurityUtils.assertCanAccessUser(id);
        return UserResponse.from(findUserUseCase.byId(id));
    }

    @GetMapping("/{id}/addresses")
    public List<AddressResponse> addresses(@PathVariable Long id) {
        SecurityUtils.assertCanAccessUser(id);
        List<Address> addresses = findAddressUseCase.byUserId(id);
        return addresses.stream().map(AddressResponse::from).toList();
    }
}
