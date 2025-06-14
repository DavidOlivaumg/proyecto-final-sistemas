import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { DoctorPrescriptionsComponent } from './components/doctor-prescriptions/doctor-prescriptions.component';
import { DoctorScheduleComponent } from './components/doctor-schedule/doctor-schedule.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'patient-dashboard', 
    component: PatientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'patient' }
  },
  { 
    path: 'doctor-dashboard', 
    component: DoctorDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' },
    
  },
  {
    path: 'appointments',
    component: DoctorAppointmentsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  {
    path: 'prescriptions',
    component: DoctorPrescriptionsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  {
    path: 'prescriptions/create/:appointmentId',
    component: DoctorPrescriptionsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  {
    path: 'schedule',
    component: DoctorScheduleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }


];