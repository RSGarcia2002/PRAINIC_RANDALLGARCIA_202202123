import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent implements OnInit {
  usuario: any = null;
  cursosAprobados: any[] = []; 
  cursosDisponibles: any[] = []; 
  totalCreditos: number = 0; 
  esMiPerfil: boolean = false;
  nuevoCursoId: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerCursosDisponibles();
  }

  obtenerUsuario() {
    const userId = this.route.snapshot.paramMap.get('id') || this.authService.getUserId(); // Obtener ID del usuario logeado o URL
    if (!userId) return;

    this.usuarioService.getUserProfile(userId).subscribe((data: any) => {
      if (data) {
        this.usuario = data.usuario;
        this.cursosAprobados = data.cursosAprobados || [];
        this.totalCreditos = data.totalCreditos || 0;
        this.esMiPerfil = userId === this.authService.getUserId();
        console.log("📌 Cursos aprobados recibidos:", this.cursosAprobados);
      }
    }, error => {
      console.error("❌ Error al obtener usuario:", error);
    });
  }

  obtenerCursosDisponibles() {
    this.usuarioService.obtenerCursos().subscribe((data: any) => {
      this.cursosDisponibles = data || [];
    }, error => {
      console.error("❌ Error al obtener cursos disponibles:", error);
    });
  }

  calcularCreditos(): number {
    return this.cursosAprobados.reduce((total: number, curso: any) => total + (curso.curso?.creditos || 0), 0);
  }
  agregarCursoAprobado() {
    if (!this.nuevoCursoId) return;
  
    console.log("🚀 Enviando solicitud para aprobar curso:", { cursoId: this.nuevoCursoId });
    this.usuarioService.agregarCursoAprobado(this.nuevoCursoId).subscribe(
      response => {
        console.log("✅ Curso aprobado con éxito:", response);
        this.obtenerUsuario(); // 🔄 Actualizar la información del usuario
        this.nuevoCursoId = ''; // Limpiar selección después de agregar
      },
      error => {
        console.error("❌ Error al aprobar curso:", error);
      }
    );
    
  }
  
  

  eliminarCursoAprobado(cursoId: string) {
    this.usuarioService.eliminarCursoAprobado(this.usuario._id, cursoId).subscribe(() => {
      this.obtenerUsuario();
    }, error => {
      console.error("❌ Error al eliminar curso aprobado:", error);
    });
  }
}
