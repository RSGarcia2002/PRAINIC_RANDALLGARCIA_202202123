import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // ✅ Importar SweetAlert2

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.authService.saveToken(response.token);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido de nuevo',
            timer: 3000,
            showConfirmButton: false
          });

          setTimeout(() => this.router.navigate(['/create-post']), 3000);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error en el inicio de sesión',
            text: 'Credenciales incorrectas',
            timer: 3000,
            showConfirmButton: false
          });
        }
      );
    }
  }
  
  irARegistro() {
    this.router.navigate(['/register']); 
  }
  
}
