import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
    standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;
  isDoctor = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['patient', Validators.required],
      // Campos comunes
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      // Campos específicos de paciente
      dateOfBirth: [''],
      gender: [''],
      address: [''],
      // Campos específicos de doctor
      specialty: ['']
    });

    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.isDoctor = role === 'doctor';
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;
    
    // 1. Registrar el usuario primero
    const userData = {
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      role: formValue.role
    };

    this.authService.registerUser(userData).subscribe({
      next: (userResponse) => {
        // 2. Registrar el perfil específico (paciente o doctor)
        if (formValue.role === 'patient') {
          const patientData = {
            user: { userId: userResponse.userId },
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            dateOfBirth: formValue.dateOfBirth,
            gender: formValue.gender,
            phone: formValue.phone,
            address: formValue.address
          };
          
          this.authService.registerPatient(patientData).subscribe({
            next: () => {
              this.router.navigate(['/login']);
            },
            error: (err) => {
              this.errorMessage = 'Error al registrar paciente: ' + err.message;
            }
          });
        } else if (formValue.role === 'doctor') {
  const doctorData = {
    user: {
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      role: formValue.role
    },
    firstName: formValue.firstName,
    lastName: formValue.lastName,
    specialty: formValue.specialty,
    phone: formValue.phone
  };
  
  this.authService.registerDoctor(doctorData).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.errorMessage = 'Error al registrar doctor: ' + err.message;
    }
  });
}
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar usuario: ' + err.message;
      }
    });
  }
}