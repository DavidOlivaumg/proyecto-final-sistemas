export interface Appointment {
  appointmentId: number;
  patient: Patient;
  doctor: Doctor;
  appointmentDate: string; // o Date si usas transformación
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string; // o Date
}

// Modelos relacionados necesarios
export interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  // otros campos relevantes
}
export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELED';

export interface Doctor {
  doctorId: number;
  firstName: string;
  lastName: string;
  specialty?: string;
  // otros campos relevantes
}