package com.proyectoFinalSO.proyectoFinal.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import java.util.Collection;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String username;
    private String role;
    private Collection<String> authorities;
}