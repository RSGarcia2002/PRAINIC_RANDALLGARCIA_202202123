import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/alumnos';

  constructor(private http: HttpClient) {}

  // ✅ Obtener datos del perfil de un usuario
  getUserProfile(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ Obtener lista de cursos disponibles
  obtenerCursos(): Observable<any> {
    return this.http.get('http://localhost:3000/api/cursos/cursos');
  }

  agregarCursoAprobado(cursoId: string): Observable<any> {
    const token = localStorage.getItem('token'); // ✅ Obtener token del usuario logeado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post(`http://localhost:3000/api/alumnos/cursos-aprobados`, { cursoId }, { headers });
  }
  
  

  // ✅ Eliminar curso aprobado
  eliminarCursoAprobado(userId: string, cursoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/cursos-aprobados/${cursoId}`);
  }
}
