package com.project.backend.web.controller;

import com.project.backend.domain.model.Address;
import com.project.backend.usecase.address.FindZipCodeUseCase;
import com.project.backend.usecase.address.CreateAddressUseCase;
import com.project.backend.usecase.address.DeleteAddressUseCase;
import com.project.backend.usecase.address.FindAddressUseCase;
import com.project.backend.usecase.address.UpdateAddressUseCase;
import com.project.backend.web.SecurityUtils;
import com.project.backend.web.dto.AddressRequest;
import com.project.backend.web.dto.AddressResponse;
import com.project.backend.web.dto.ZipCodeResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final CreateAddressUseCase createAddressUseCase;
    private final UpdateAddressUseCase updateAddressUseCase;
    private final DeleteAddressUseCase deleteAddressUseCase;
    private final FindZipCodeUseCase findZipCodeUseCase;
    private final FindAddressUseCase findAddressUseCase;

    public AddressController(
            CreateAddressUseCase createAddressUseCase,
            UpdateAddressUseCase updateAddressUseCase,
            DeleteAddressUseCase deleteAddressUseCase,
            FindZipCodeUseCase findZipCodeUseCase,
            FindAddressUseCase findAddressUseCase
    ) {
        this.createAddressUseCase = createAddressUseCase;
        this.updateAddressUseCase = updateAddressUseCase;
        this.deleteAddressUseCase = deleteAddressUseCase;
        this.findZipCodeUseCase = findZipCodeUseCase;
        this.findAddressUseCase = findAddressUseCase;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public AddressResponse create(@Valid @RequestBody AddressRequest request) {
        SecurityUtils.assertCanAccessUser(request.userId());
        return AddressResponse.from(createAddressUseCase.execute(request.toDomain()));
    }

    @PutMapping("/{id}")
    @Transactional
    public AddressResponse update(@PathVariable Long id, @Valid @RequestBody AddressRequest request) {
        Address updated = updateAddressUseCase.execute(id, request.toDomain());
        return AddressResponse.from(updated);
    }

    @PatchMapping("/{id}/main")
    @Transactional
    public AddressResponse setMainAddress(@PathVariable Long id) {
        Address existing = findAddressUseCase.byId(id);
        SecurityUtils.assertCanAccessUser(existing.getUserId());
        existing.setIsMainAddress(true);
        return AddressResponse.from(updateAddressUseCase.execute(id, existing));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void delete(@PathVariable Long id) {
        Address existing = findAddressUseCase.byId(id);
        SecurityUtils.assertCanAccessUser(existing.getUserId());
        deleteAddressUseCase.execute(id);
    }

    @GetMapping("/zip-code/{zipCode}")
    public ZipCodeResponse findZipCode(@PathVariable String zipCode) {
        return ZipCodeResponse.from(findZipCodeUseCase.execute(zipCode));
    }
}
