import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = 'http://localhost:3000/api/comentarios';

  constructor(private http: HttpClient) {}

  // ✅ Obtener comentarios de una publicación
  obtenerComentarios(publicacionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${publicacionId}`);
  }

  // ✅ Agregar un comentario
  agregarComentario(publicacionId: string, texto: string): Observable<any> {
    const token = localStorage.getItem('token'); // 🔥 Obtiene el token del usuario logueado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, { publicacion: publicacionId, texto }, { headers });
  }

  // ✅ Eliminar un comentario (solo si el usuario es el dueño)
  eliminarComentario(comentarioId: string): Observable<any> {
    const token = localStorage.getItem('token'); // 🔥 Obtiene el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/${comentarioId}`, { headers });
  }
}
