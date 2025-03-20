import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // ✅ Importar SweetAlert2

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      registroAcademico: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Ahora puedes iniciar sesión',
            timer: 3000,
            showConfirmButton: false
          });

          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: 'Intenta con otro correo',
            timer: 3000,
            showConfirmButton: false
          });
        }
      );
    }
  }
}
