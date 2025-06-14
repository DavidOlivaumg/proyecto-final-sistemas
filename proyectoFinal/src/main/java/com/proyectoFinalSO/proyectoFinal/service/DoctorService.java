package com.proyectoFinalSO.proyectoFinal.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import com.proyectoFinalSO.proyectoFinal.exceptions.ResourceNotFoundException;
import com.proyectoFinalSO.proyectoFinal.model.Doctor;
import com.proyectoFinalSO.proyectoFinal.model.User;
import com.proyectoFinalSO.proyectoFinal.repository.DoctorRepository;
import com.proyectoFinalSO.proyectoFinal.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    public Doctor findById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor no encontrado con id: " + id));
    }

    public Doctor save(Doctor doctor) {
    if(doctor.getUser().getUserId() == null) {
        User savedUser = userRepository.save(doctor.getUser());
        doctor.setUser(savedUser);
    }
    return doctorRepository.save(doctor);
}

    public Doctor update(Long id, Doctor doctorDetails) {
        Doctor doctor = findById(id);
        doctor.setFirstName(doctorDetails.getFirstName());
        doctor.setLastName(doctorDetails.getLastName());
        doctor.setSpecialty(doctorDetails.getSpecialty());
        doctor.setPhone(doctorDetails.getPhone());
        return doctorRepository.save(doctor);
    }

    public void delete(Long id) {
        Doctor doctor = findById(id);
        doctorRepository.delete(doctor);
    }
}