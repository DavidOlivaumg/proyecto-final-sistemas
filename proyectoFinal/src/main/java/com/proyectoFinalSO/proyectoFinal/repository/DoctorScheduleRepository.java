package com.proyectoFinalSO.proyectoFinal.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoFinalSO.proyectoFinal.model.Doctor;
import com.proyectoFinalSO.proyectoFinal.model.DoctorSchedule;

import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {
    List<DoctorSchedule> findByDoctor(Doctor doctor);
}