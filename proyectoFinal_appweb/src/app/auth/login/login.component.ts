import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.router.events.subscribe(event => {
    console.log('🔄 Evento del Router:', event);
  });

  }

  

onSubmit(): void {
  if (this.loginForm.invalid) {
    return;
  }

  const { username, password } = this.loginForm.value;
  
  console.log('📤 Datos enviados al backend:', { username, password });
  
  this.authService.login(username, password).subscribe({
    next: (response) => {
      console.log('📥 Respuesta recibida del backend:', response);
      
      const role = response?.role?.toLowerCase();
      console.log('🔍 Rol obtenido:', role);
      
      if (!role) {
        this.errorMessage = 'No se pudo determinar el rol del usuario';
        console.error('❌ No se encontró rol en la respuesta');
        return;
      }

      console.log('🔄 Intentando redirección para rol:', role);
      
      if (role === 'doctor') {
        this.router.navigate(['/doctor-dashboard']);
      } else if (role === 'patient') {
        this.router.navigate(['/patient-dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    },
    error: (err) => {
      console.error('❌ Error en login:', err);
      this.errorMessage = 'Credenciales incorrectas';
      if (err.status === 401) {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      } else if (err.status === 0) {
        this.errorMessage = 'No se puede conectar al servidor';
      }
    }
  });
}


}