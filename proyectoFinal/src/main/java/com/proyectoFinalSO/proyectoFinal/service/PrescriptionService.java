package com.proyectoFinalSO.proyectoFinal.service;




import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.proyectoFinalSO.proyectoFinal.exceptions.ResourceNotFoundException;
import com.proyectoFinalSO.proyectoFinal.model.Appointment;
import com.proyectoFinalSO.proyectoFinal.model.Doctor;
import com.proyectoFinalSO.proyectoFinal.model.Patient;
import com.proyectoFinalSO.proyectoFinal.model.Prescription;
import com.proyectoFinalSO.proyectoFinal.repository.AppointmentRepository;
import com.proyectoFinalSO.proyectoFinal.repository.DoctorRepository;
import com.proyectoFinalSO.proyectoFinal.repository.PatientRepository;
import com.proyectoFinalSO.proyectoFinal.repository.PrescriptionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    public List<Prescription> findAll() {
        return prescriptionRepository.findAll();
    }

    public Prescription findById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with id: " + id));
    }

    public Prescription save(Prescription prescription) {
        Doctor doctor = doctorRepository.findById(prescription.getDoctor().getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Patient patient = patientRepository.findById(prescription.getPatient().getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        prescription.setDoctor(doctor);
        prescription.setPatient(patient);

        if (prescription.getAppointment() != null && prescription.getAppointment().getAppointmentId() != null) {
            Appointment appointment = appointmentRepository.findById(prescription.getAppointment().getAppointmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
            prescription.setAppointment(appointment);
        }

        return prescriptionRepository.save(prescription);
    }

    public Prescription update(Long id, Prescription prescriptionDetails) {
        Prescription prescription = findById(id);
        prescription.setPrescriptionDate(prescriptionDetails.getPrescriptionDate());
        prescription.setMedication(prescriptionDetails.getMedication());
        prescription.setDosage(prescriptionDetails.getDosage());
        prescription.setInstructions(prescriptionDetails.getInstructions());
        return prescriptionRepository.save(prescription);
    }

    public void delete(Long id) {
        Prescription prescription = findById(id);
        prescriptionRepository.delete(prescription);
    }

    public List<Prescription> findByDoctorId(Long doctorId) {
        return prescriptionRepository.findByDoctorDoctorId(doctorId);
    }

    public List<Prescription> findByPatientId(Long patientId) {
        return prescriptionRepository.findByPatientPatientId(patientId);
    }
}