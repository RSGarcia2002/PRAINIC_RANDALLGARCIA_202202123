import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private API_URL = 'http://localhost:3000/api/publicacion'; // Asegúrate de que coincide con tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las publicaciones
  obtenerPublicaciones(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  // 🔥 Crear una nueva publicación
  crearPublicacion(publicacion: any): Observable<any> {
    const token = localStorage.getItem('token'); // ✅ Obtiene el token automáticamente
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.API_URL, publicacion, { headers });
  }

  obtenerCursos(): Observable<any> {
    return this.http.get('http://localhost:3000/api/cursos/cursos');
  }
  
  obtenerCatedraticos(): Observable<any> {
    return this.http.get('http://localhost:3000/api/catedratico/catedraticos');
  }
  

}
