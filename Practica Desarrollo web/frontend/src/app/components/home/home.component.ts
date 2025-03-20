import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../../services/publicacion.service';
import { ComentarioService } from '../../services/comentario.service';
import { AuthService } from '../../services/auth.service';
import { Router,RouterModule  } from '@angular/router';
import { FormsModule } from '@angular/forms';    // ✅ Importar FormsModule

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Agregar esto si el componente es standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule,FormsModule,RouterModule] // ✅ Importamos CommonModule para usar *ngIf y *ngFor
})
export class HomeComponent {
  publicaciones: any[] = [];
  nuevoComentario: { [key: string]: string } = {};

  constructor(private publicacionService: PublicacionService, private comentarioService: ComentarioService, private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }

  obtenerPublicaciones() {
    this.publicacionService.obtenerPublicaciones().subscribe(
      data => {
        this.publicaciones = data;
      },
      error => {
        console.error('Error al obtener publicaciones:', error);
      }
    );
  }

  redirigirCrearPublicacion() {
    if (this.authService.isAuthenticated()) {
      // ✅ Si el usuario está autenticado, lo manda a la página de crear publicación
      this.router.navigate(['/create-post']);
    } else {
      // ❌ Si no está autenticado, lo redirige al login
      this.router.navigate(['/login']);
    }
  }
  agregarComentario(publicacion: any) {
    const comentarioTexto = this.nuevoComentario[publicacion._id]; // Obtiene el texto del comentario
    if (!comentarioTexto) return; // Evita enviar comentarios vacíos
  
    this.comentarioService.agregarComentario(publicacion._id, comentarioTexto).subscribe(response => {
      console.log("🟢 Comentario agregado:", response);
  
      // ✅ Si la publicación no tiene comentarios, inicializamos el array
      if (!publicacion.comentarios) {
        publicacion.comentarios = [];
      }
  
      // ✅ Agregar comentario directamente a la lista
      publicacion.comentarios.push(response.comentario);
  
      // ✅ Limpiar input después de agregar comentario
      this.nuevoComentario[publicacion._id] = '';
    }, error => {
      console.error("❌ Error al agregar comentario:", error);
    });
  }
  
}
