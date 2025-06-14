package com.proyectoFinalSO.proyectoFinal.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoFinalSO.proyectoFinal.dto.LoginRequest;
import com.proyectoFinalSO.proyectoFinal.dto.LoginResponse;
import com.proyectoFinalSO.proyectoFinal.model.User;
import com.proyectoFinalSO.proyectoFinal.repository.UserRepository;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
        log.info(" Intento de login para usuario: {}", request.getUsername());
        
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        
        if (userOptional.isEmpty()) {
            
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
        
        User user = userOptional.get();
        
        
        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        
        if (!passwordMatches) {
           
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
        
     
        LoginResponse response = new LoginResponse(
            user.getUsername(),
            user.getRole().name().toLowerCase(), 
            Collections.singletonList("ROLE_" + user.getRole())
        );
        
       
        
        log.info("✅ Login exitoso para usuario: {}", user.getUsername());
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        log.error("💥 Error durante el login: ", e);
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }
}
}