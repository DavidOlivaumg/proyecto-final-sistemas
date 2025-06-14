import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../auth/auth.service';
import { Prescription, PrescriptionCreateDto } from '../../models/prescription.model';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-doctor-prescriptions',
  templateUrl: './doctor-prescriptions.component.html',
  styleUrls: ['./doctor-prescriptions.component.css'],
   standalone: false
})
export class DoctorPrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];
  newPrescription: PrescriptionCreateDto = {
    prescriptionDate: new Date().toISOString().split('T')[0],
    medication: '',
    dosage: '',
    instructions: '',
    doctorId: 0, // Se actualizará al crear
    patientId: 0 // Se obtendrá de la cita si existe
  };
  selectedAppointmentId: number | null = null;
  showCreateForm = false;

  constructor(
    private prescriptionService: PrescriptionService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
    
    // Si viene de una cita específica
    this.route.params.subscribe(params => {
      if (params['appointmentId']) {
        this.selectedAppointmentId = +params['appointmentId'];
        this.showCreateForm = true;
      }
    });
  }

  loadPrescriptions(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.userId) {
      this.prescriptionService.getPrescriptionsByDoctor(currentUser.userId).subscribe({
        next: (data) => {
          this.prescriptions = data;
        },
        error: (err) => console.error('Error loading prescriptions:', err)
      });
    }
  }

  createPrescription(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.userId) return;

    // Si viene de una cita, obtener paciente
    if (this.selectedAppointmentId) {
      this.appointmentService.getAppointmentById(this.selectedAppointmentId).subscribe({
        next: (appointment: Appointment) => {
          const prescriptionData: PrescriptionCreateDto = {
            ...this.newPrescription,
            doctorId: currentUser.userId,
            patientId: appointment.patient.patientId,
            appointmentId: this.selectedAppointmentId || undefined // Convertimos null a undefined
          };

          this.savePrescription(prescriptionData);
        },
        error: (err) => console.error('Error loading appointment:', err)
      });
    } else {
      const prescriptionData: PrescriptionCreateDto = {
        ...this.newPrescription,
        doctorId: currentUser.userId,
        appointmentId: undefined // Aseguramos que sea undefined si no hay cita
      };
      this.savePrescription(prescriptionData);
    }
  }

  private savePrescription(data: PrescriptionCreateDto): void {
    this.prescriptionService.createPrescription(data).subscribe({
      next: () => {
        this.loadPrescriptions();
        this.resetForm();
      },
      error: (err) => console.error('Error creating prescription:', err)
    });
  }

  private resetForm(): void {
    this.showCreateForm = false;
    this.newPrescription = {
      prescriptionDate: new Date().toISOString().split('T')[0],
      medication: '',
      dosage: '',
      instructions: '',
      doctorId: 0,
      patientId: 0
    };
    this.selectedAppointmentId = null;
  }
}