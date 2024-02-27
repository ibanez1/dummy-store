import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login, LoginReponse } from '../interfaces/login.interface';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.URL_API;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  /**
* Realiza una solicitud de inicio de sesión.
* @param loginInfo La información de inicio de sesión.
* @returns Un Observable que emite la respuesta de inicio de sesión.
*/
  login(loginInfo: Login): Observable<LoginReponse> {
    console.log("AUTH SERVICE LOGIN:::", loginInfo);
    const loginUrl = `${BASE_URL}/auth/login`;
    return this.http
      .post<LoginReponse>(loginUrl, loginInfo)
      .pipe(tap((response) => this.saveLoginInfo(response)));
  }

  /**
* Guarda la información de inicio de sesión en el almacenamiento local.
* @param response La respuesta de inicio de sesión que contiene el token y la informacion del usuario que se logueo.
*/
  saveLoginInfo(response: LoginReponse): void {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('user', JSON.stringify(response)); 

  }

  /**
   * Se usa para obtener la información del usuario que se encuentra almacenada en el sessionStorage
   */
  getUserInfo(): any | null {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }

  /**
* Obtiene el token de autenticación del almacenamiento local.
* @returns El token de autenticación o una cadena vacía si no está disponible.
*/
  getToken(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  /**
* Elimina el token de autenticación y la info del user del almacenamiento local.
*/
  public deleteTokenAndUser(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  /**
* Verifica si el usuario está autenticado.
* @returns Un valor booleano que indica si el usuario está autenticado.
*/
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  /**
* Cierra la sesión del usuario
* Ejecuta la función deleteTokenAndUser
* y redirige al usuario a la página de login.
*/
  public logout(): void {
    this.deleteTokenAndUser();
    this.router.navigateByUrl('/auth', {
      replaceUrl: true,
    });
  }
}