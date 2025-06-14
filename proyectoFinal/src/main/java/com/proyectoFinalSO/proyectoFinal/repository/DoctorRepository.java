package com.proyectoFinalSO.proyectoFinal.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoFinalSO.proyectoFinal.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}