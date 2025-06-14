package com.proyectoFinalSO.proyectoFinal.service;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.proyectoFinalSO.proyectoFinal.exceptions.ResourceNotFoundException;
import com.proyectoFinalSO.proyectoFinal.model.Patient;
import com.proyectoFinalSO.proyectoFinal.model.User;
import com.proyectoFinalSO.proyectoFinal.repository.PatientRepository;
import com.proyectoFinalSO.proyectoFinal.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    public Patient findById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con id: " + id));
    }

    public Patient save(Patient patient) {
        User user = userRepository.findById(patient.getUser().getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User no encontrado"));
        patient.setUser(user);
        return patientRepository.save(patient);
    }

    public Patient update(Long id, Patient patientDetails) {
        Patient patient = findById(id);
        patient.setFirstName(patientDetails.getFirstName());
        patient.setLastName(patientDetails.getLastName());
        patient.setDateOfBirth(patientDetails.getDateOfBirth());
        patient.setGender(patientDetails.getGender());
        patient.setPhone(patientDetails.getPhone());
        patient.setAddress(patientDetails.getAddress());
        return patientRepository.save(patient);
    }

    public void delete(Long id) {
        Patient patient = findById(id);
        patientRepository.delete(patient);
    }
}