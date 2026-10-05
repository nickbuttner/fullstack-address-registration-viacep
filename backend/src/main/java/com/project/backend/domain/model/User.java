package com.project.backend.domain.model;

import java.time.LocalDate;

public class User {

    private Long id;
    private String name;
    private String cpf;
    private LocalDate birthDate;
    private String password;
    private Role role;

    public User(Long id, String name, String cpf, LocalDate birthDate, String password, Role role) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCpf() {
        return cpf;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }
}
