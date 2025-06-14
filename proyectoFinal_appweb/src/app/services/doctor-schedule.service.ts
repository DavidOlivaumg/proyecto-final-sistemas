import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorSchedule, DoctorScheduleCreateDto } from '../models/doctor-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {
  private apiUrl = 'http://backend-service:8080/api/doctor-schedules';

  constructor(private http: HttpClient) {}

  getSchedulesByDoctor(doctorId: number): Observable<DoctorSchedule[]> {
    return this.http.get<DoctorSchedule[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  createSchedule(scheduleData: DoctorScheduleCreateDto): Observable<DoctorSchedule> {
  return this.http.post<DoctorSchedule>(this.apiUrl, scheduleData);
}
  deleteSchedule(scheduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${scheduleId}`);
  }

  updateSchedule(scheduleId: number, scheduleData: Partial<DoctorSchedule>): Observable<DoctorSchedule> {
    return this.http.put<DoctorSchedule>(`${this.apiUrl}/${scheduleId}`, scheduleData);
  }

  
}