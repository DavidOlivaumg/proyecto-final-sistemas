package com.proyectoFinalSO.proyectoFinal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.proyectoFinalSO.proyectoFinal.exceptions.ResourceNotFoundException;
import com.proyectoFinalSO.proyectoFinal.model.Appointment;
import com.proyectoFinalSO.proyectoFinal.model.Doctor;
import com.proyectoFinalSO.proyectoFinal.model.Patient;
import com.proyectoFinalSO.proyectoFinal.repository.AppointmentRepository;
import com.proyectoFinalSO.proyectoFinal.repository.DoctorRepository;
import com.proyectoFinalSO.proyectoFinal.repository.PatientRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
    }

    public Appointment save(Appointment appointment) {
        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Patient patient = patientRepository.findById(appointment.getPatient().getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        return appointmentRepository.save(appointment);
    }

    public Appointment update(Long id, Appointment appointmentDetails) {
        Appointment appointment = findById(id);
        appointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        appointment.setStartTime(appointmentDetails.getStartTime());
        appointment.setEndTime(appointmentDetails.getEndTime());
        appointment.setStatus(appointmentDetails.getStatus());
        appointment.setNotes(appointmentDetails.getNotes());
        return appointmentRepository.save(appointment);
    }

    public void delete(Long id) {
        Appointment appointment = findById(id);
        appointmentRepository.delete(appointment);
    }

    public List<Appointment> findByDoctorId(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor no encontrado"));
        return appointmentRepository.findByDoctor(doctor);
    }

    public List<Appointment> findByPatientId(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado"));
        return appointmentRepository.findByPatient(patient);
    }

    public List<Appointment> findByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date);
    }
}