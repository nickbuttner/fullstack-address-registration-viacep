package com.project.backend.domain.model;

public class ZipCodeInfo {

    private final String zipCode;
    private final String street;
    private final String neighborhood;
    private final String city;
    private final String state;

    public ZipCodeInfo(String zipCode, String street, String neighborhood, String city, String state) {
        this.zipCode = zipCode;
        this.street = street;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
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
}
