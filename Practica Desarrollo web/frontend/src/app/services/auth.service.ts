import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 
  private usuarioSubject = new BehaviorSubject<any>(null); // 🔥 Almacena el usuario en tiempo real
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.verificarUsuario(); // 🔥 Verificar si hay un usuario guardado al recargar la página
  }

  // ✅ Registro de usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // ✅ Login de usuario (Guarda el token y actualiza el usuario)
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
          this.verificarUsuario(); // 🔥 Llamar a verificarUsuario para actualizar la navbar
        }
      })
    );
  }

  // ✅ Guardar token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.verificarUsuario(); // 🔥 Llamamos a `verificarUsuario` cada vez que se guarde un nuevo token
  }

  // ✅ Obtener el token del usuario
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ Extraer usuario del token y actualizar la navbar
  verificarUsuario() {
    const token = this.getToken();
    if (token && token.includes('.')) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("🟢 Usuario autenticado:", payload.email);
        this.usuarioSubject.next({ nombre: payload.email.split('@')[0] }); // 🔥 Extrae solo el nombre del email
      } catch (error) {
        console.error("❌ Error al decodificar el token:", error);
        this.usuarioSubject.next(null);
      }
    } else {
      console.warn("⚠️ No hay usuario autenticado.");
      this.usuarioSubject.next(null);
    }
  }

  // ✅ Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.usuarioSubject.next(null);
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el token
      return payload.id; // Extraer el ID del usuario
    } catch (error) {
      console.error('❌ Error al decodificar el token:', error);
      return null;
    }
  }
  
}
