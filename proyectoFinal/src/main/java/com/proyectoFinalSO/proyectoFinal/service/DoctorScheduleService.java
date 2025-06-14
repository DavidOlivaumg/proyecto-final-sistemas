package com.proyectoFinalSO.proyectoFinal.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.proyectoFinalSO.proyectoFinal.exceptions.ResourceNotFoundException;
import com.proyectoFinalSO.proyectoFinal.model.Doctor;
import com.proyectoFinalSO.proyectoFinal.model.DoctorSchedule;
import com.proyectoFinalSO.proyectoFinal.repository.DoctorRepository;
import com.proyectoFinalSO.proyectoFinal.repository.DoctorScheduleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorScheduleService {
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final DoctorRepository doctorRepository;

    public List<DoctorSchedule> findAll() {
        return doctorScheduleRepository.findAll();
    }

    public DoctorSchedule findById(Long id) {
        return doctorScheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado con id: " + id));
    }

    public DoctorSchedule save(DoctorSchedule doctorSchedule) {
        Doctor doctor = doctorRepository.findById(doctorSchedule.getDoctor().getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor no encontrado"));
        doctorSchedule.setDoctor(doctor);
        return doctorScheduleRepository.save(doctorSchedule);
    }

    public DoctorSchedule update(Long id, DoctorSchedule scheduleDetails) {
        DoctorSchedule schedule = findById(id);
        schedule.setDayOfWeek(scheduleDetails.getDayOfWeek());
        schedule.setStartTime(scheduleDetails.getStartTime());
        schedule.setEndTime(scheduleDetails.getEndTime());
        return doctorScheduleRepository.save(schedule);
    }

    public void delete(Long id) {
        DoctorSchedule schedule = findById(id);
        doctorScheduleRepository.delete(schedule);
    }

    public List<DoctorSchedule> findByDoctorId(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        return doctorScheduleRepository.findByDoctor(doctor);
    }
}