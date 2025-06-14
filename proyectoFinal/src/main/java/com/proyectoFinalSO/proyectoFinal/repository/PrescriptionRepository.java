package com.proyectoFinalSO.proyectoFinal.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoFinalSO.proyectoFinal.model.Prescription;

import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByDoctorDoctorId(Long doctorId);
    List<Prescription> findByPatientPatientId(Long patientId);
}