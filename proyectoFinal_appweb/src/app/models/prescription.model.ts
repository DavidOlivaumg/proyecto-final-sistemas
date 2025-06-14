import { Appointment, Doctor, Patient } from "./appointment.model";

// prescription.model.ts
export interface Prescription {
  prescriptionId: number;
  appointment?: Appointment;
  doctor: Doctor;
  patient: Patient;
  prescriptionDate: string;
  medication: string;
  dosage: string;
  instructions?: string;
}

export interface PrescriptionCreateDto {
  prescriptionDate: string;
  medication: string;
  dosage: string;
  instructions?: string;
  doctorId: number;
  patientId: number;
  appointmentId?: number;
}