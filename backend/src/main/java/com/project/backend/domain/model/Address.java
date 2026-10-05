package com.project.backend.domain.model;

public class Address {

    private Long id;
    private String zipCode;
    private String street;
    private String neighborhood;
    private String city;
    private String state;
    private String number;
    private String complement;
    private Boolean isMainAddress;
    private Long userId;

    public Address(Long id, String zipCode, String street, String neighborhood, String city, String state,
                   String number, String complement, Boolean isMainAddress, Long userId) {
        this.id = id;
        this.zipCode = zipCode;
        this.street = street;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.number = number;
        this.complement = complement;
        this.isMainAddress = isMainAddress != null ? isMainAddress : false;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getStreet() {
        return street;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getNumber() {
        return number;
    }

    public String getComplement() {
        return complement;
    }

    public Boolean getIsMainAddress() {
        return isMainAddress;
    }

    public void setIsMainAddress(Boolean isMainAddress) {
        this.isMainAddress = isMainAddress;
    }

    public Long getUserId() {
        return userId;
    }

    public void update(String zipCode, String street, String neighborhood, String city, String state,
                       String number, String complement, Boolean isMainAddress) {
        if (zipCode != null) {
            this.zipCode = zipCode;
        }
        if (street != null) {
            this.street = street;
        }
        if (neighborhood != null) {
            this.neighborhood = neighborhood;
        }
        if (city != null) {
            this.city = city;
        }
        if (state != null) {
            this.state = state;
        }
        if (number != null) {
            this.number = number;
        }
        if (complement != null) {
            this.complement = complement;
        }
        if (isMainAddress != null) {
            this.isMainAddress = isMainAddress;
        }
    }
}
