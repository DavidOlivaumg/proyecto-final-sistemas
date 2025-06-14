import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription, PrescriptionCreateDto } from '../models/prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8080/api/prescriptions';

  constructor(private http: HttpClient) {}

  getPrescriptionsByDoctor(doctorId: number): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

 createPrescription(prescriptionData: PrescriptionCreateDto): Observable<Prescription> {
  return this.http.post<Prescription>(this.apiUrl, prescriptionData);
}

  getPrescriptionsByPatient(patientId: number): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/patient/${patientId}`);
  }
}