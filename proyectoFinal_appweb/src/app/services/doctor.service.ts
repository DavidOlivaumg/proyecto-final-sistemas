import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Prescription } from '../models/prescription.model';
import { DoctorSchedule } from '../models/doctor-schedule.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://34.28.223.29:8080/api';

  constructor(private http: HttpClient) {}

  // Métodos para citas
  getDoctorAppointments(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor/${doctorId}`);
  }

  updateAppointmentStatus(appointmentId: number, status: string): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.apiUrl}/appointments/${appointmentId}/status`, { status });
  }

  // Métodos para recetas
  getDoctorPrescriptions(doctorId: number): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/prescriptions/doctor/${doctorId}`);
  }

  createDoctorPrescription(prescription: Omit<Prescription, 'prescriptionId'>): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.apiUrl}/prescriptions`, prescription);
  }

  // Métodos para horarios
  getDoctorSchedules(doctorId: number): Observable<DoctorSchedule[]> {
    return this.http.get<DoctorSchedule[]>(`${this.apiUrl}/doctor-schedules/doctor/${doctorId}`);
  }

  addDoctorSchedule(schedule: Omit<DoctorSchedule, 'scheduleId'>): Observable<DoctorSchedule> {
    return this.http.post<DoctorSchedule>(`${this.apiUrl}/doctor-schedules`, schedule);
  }

  removeDoctorSchedule(scheduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doctor-schedules/${scheduleId}`);
  }
}