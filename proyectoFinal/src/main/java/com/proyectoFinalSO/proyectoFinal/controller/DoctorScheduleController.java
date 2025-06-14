package com.proyectoFinalSO.proyectoFinal.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyectoFinalSO.proyectoFinal.model.DoctorSchedule;
import com.proyectoFinalSO.proyectoFinal.service.DoctorScheduleService;

import java.util.List;

@RestController
@RequestMapping("/api/doctor-schedules")
@RequiredArgsConstructor
public class DoctorScheduleController {
    private final DoctorScheduleService doctorScheduleService;

    @GetMapping
    public ResponseEntity<List<DoctorSchedule>> findAll() {
        return ResponseEntity.ok(doctorScheduleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorSchedule> findById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorScheduleService.findById(id));
    }

    @PostMapping
    public ResponseEntity<DoctorSchedule> save(@RequestBody DoctorSchedule doctorSchedule) {
        return ResponseEntity.ok(doctorScheduleService.save(doctorSchedule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorSchedule> update(@PathVariable Long id, @RequestBody DoctorSchedule doctorSchedule) {
        return ResponseEntity.ok(doctorScheduleService.update(id, doctorSchedule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        doctorScheduleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<DoctorSchedule>> findByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorScheduleService.findByDoctorId(doctorId));
    }
}