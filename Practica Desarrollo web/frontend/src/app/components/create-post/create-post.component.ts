import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { Router } from '@angular/router';
import { PublicacionService } from '../../services/publicacion.service';


@Component({
  selector: 'app-create-post',
  standalone: true, // ✅ Agregar esto si el componente es independiente
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  imports: [CommonModule, FormsModule] // ✅ Importar CommonModule y FormsModule
})
export class CreatePostComponent implements OnInit {
  publicacion: any = { mensaje: '', curso: '', catedratico: '' };
  cursos: any[] = [];
  catedraticos: any[] = [];

  constructor(private publicacionService: PublicacionService, private router: Router) {}

  ngOnInit(): void {
    this.publicacionService.obtenerCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  
    this.publicacionService.obtenerCatedraticos().subscribe(catedraticos => {
      this.catedraticos = catedraticos;
    });
  }

  cargarCursos() {
    this.cursos = [
      { _id: 'curso1', nombre: 'Matemáticas' },
      { _id: 'curso2', nombre: 'Historia' }
    ];
  }

  cargarCatedraticos() {
    this.catedraticos = [
      { _id: 'cated1', nombre: 'Prof. Juan Pérez' },
      { _id: 'cated2', nombre: 'Dra. María López' }
    ];
  }

  crearPublicacion() {
    console.log("✅ Publicación enviada:", this.publicacion);
    this.publicacionService.crearPublicacion(this.publicacion).subscribe(response => {
      console.log("🟢 Publicación creada:", response);
      this.router.navigate(['/']);
    }, error => {
      console.error("❌ Error al publicar:", error);
    });
  }
}
