package com.project.backend.domain.model;

public final class Cpf {

    private final String value;

    public Cpf(String raw) {
        String digits = raw == null ? "" : raw.replaceAll("\\D", "");
        if (!isValid(digits)) {
            throw new IllegalArgumentException("CPF inválido.");
        }
        this.value = digits;
    }

    public String getValue() {
        return value;
    }

    public static boolean isValid(String cpf) {
        if (cpf == null || cpf.length() != 11) {
            return false;
        }
        if (cpf.chars().distinct().count() == 1) {
            return false;
        }
        return checkDigit(cpf, 9) && checkDigit(cpf, 10);
    }

    private static boolean checkDigit(String cpf, int length) {
        int sum = 0;
        int weight = length + 1;
        for (int i = 0; i < length; i++) {
            sum += Character.getNumericValue(cpf.charAt(i)) * (weight - i);
        }
        int remainder = sum % 11;
        int digit = remainder < 2 ? 0 : 11 - remainder;
        return digit == Character.getNumericValue(cpf.charAt(length));
    }
}
