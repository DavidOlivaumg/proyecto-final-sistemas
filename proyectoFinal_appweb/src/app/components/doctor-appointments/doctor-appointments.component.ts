import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { Appointment, AppointmentStatus } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';


@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css'],
  standalone: false
})
export class DoctorAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  filterStatus: string = 'all';
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.userId) {
      this.appointmentService.getAppointmentsByDoctor(currentUser.userId).subscribe({
        next: (data) => {
          this.appointments = data;
          this.applyFilters();
        },
        error: (err) => console.error('Error loading appointments:', err)
      });
    }
  }

  applyFilters(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesStatus = this.filterStatus === 'all' || 
                          appointment.status.toLowerCase() === this.filterStatus.toLowerCase();
      const matchesDate = !this.selectedDate || 
                         new Date(appointment.appointmentDate).toISOString().split('T')[0] === this.selectedDate;
      return matchesStatus && matchesDate;
    });
  }

  updateStatus(appointment: Appointment, newStatus: AppointmentStatus): void {
  appointment.status = newStatus;
  this.appointmentService.updateAppointment(appointment.appointmentId, appointment).subscribe({
    next: () => {
      this.loadAppointments();
    },
    error: (err) => console.error('Error updating appointment:', err)
  });
}
}