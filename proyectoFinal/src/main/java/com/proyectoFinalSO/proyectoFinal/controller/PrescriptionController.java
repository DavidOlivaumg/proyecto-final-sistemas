package com.proyectoFinalSO.proyectoFinal.controller;



import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyectoFinalSO.proyectoFinal.model.Prescription;
import com.proyectoFinalSO.proyectoFinal.service.PrescriptionService;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {
    private final PrescriptionService prescriptionService;

    @GetMapping
    public ResponseEntity<List<Prescription>> findAll() {
        return ResponseEntity.ok(prescriptionService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> findById(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Prescription> save(@RequestBody Prescription prescription) {
        return ResponseEntity.ok(prescriptionService.save(prescription));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> update(@PathVariable Long id, @RequestBody Prescription prescription) {
        return ResponseEntity.ok(prescriptionService.update(id, prescription));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        prescriptionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Prescription>> findByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(prescriptionService.findByDoctorId(doctorId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> findByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionService.findByPatientId(patientId));
    }
}