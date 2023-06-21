import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DtLogin } from 'src/app/modelos/dataTypes/DtLogin';
import { Local } from 'src/app/modelos/dataTypes/Local.interface';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';
import { DtAltaDomicilio } from 'src/app/modelos/dataTypes/DtDomicilio';
import { DtTokenUser } from 'src/app/modelos/dataTypes/DtUsuario';
import { DtModificarUsuario } from 'src/app/modelos/dataTypes/DtUsuario';
import { DtAltaArticulo, DtAltaCompra, DtAltaReclamo, DtCompra, DtReclamo } from 'src/app/modelos/dataTypes/DtCompra';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  user = null;
  authenticationState = new BehaviorSubject(false);

  apiURL: string = `${environment.BACKEND_API_URL}`;

  constructor(private http: HttpClient, private alertController: AlertController) {}

  register(credentials: any) {
    return this.http.post(`${this.apiURL}/auth/registro`, credentials);
  }

  login(credentials: DtLogin) {
    return this.http.post(`${this.apiURL}/auth/login`, credentials);
  }

  resetPassword(email: string) {
    return this.http.post(`${this.apiURL}/auth/contrasenia/recuperar?email=${email}`, '');
  }

  misLocales(abierto: Boolean): Observable<Local[]> {
    return this.http.get<Local[]>(`${this.apiURL}/locales?abierto=${abierto}`);
  }

  categoriasLocal(): Observable<DtCategoria[]> {
    return this.http.get<DtCategoria[]>(`${this.apiURL}/categorias?publico=true`);
  }

  //Te trae un producto de UN local en especifico
  /*obtenerProductoDeLocal(localId:number, productoId: number){
		return this.http.get<DtGetProducto>(`${this.apiURL}/locales/${localId}/productos/${productoId}`)
	}*/

  //Obtenes todos los productos de un local especifico
  obtenerProductosLocal(idLocal: number): Observable<DtGetProducto[]> {
    return this.http.get<DtGetProducto[]>(`${this.apiURL}/locales/${idLocal}/productos`);
  }

  //Obtenes los productos de un local segun la categoria
  obtenerProductosDeCategoria(idLocal: number, idCategoria: number): Observable<DtGetProducto[]> {
    return this.http.get<DtGetProducto[]>(`${this.apiURL}/locales/${idLocal}/productos?idCategoria=${idCategoria}`);
  }

  altaDomicilio(dtAltaDomicilio: DtAltaDomicilio, idUsuario: any) {
    return this.http.post(`${this.apiURL}/usuarios/${idUsuario}/direcciones`, dtAltaDomicilio);
  }

  obtenerDirecciones(usuarioId: any) {
    return this.http.get<any>(`${this.apiURL}/usuarios/${usuarioId}`);
  }

  deleteDireccion(idUsuario: any, idDireccion: number) {
    return this.http.delete(`${this.apiURL}/usuarios/${idUsuario}/direcciones/${idDireccion}`);
  }

  obtenerInfousuario(usuarioId: any) {
    return this.http.get<any>(`${this.apiURL}/usuarios/${usuarioId}`);
  }

  modificarUsuario(usuarioId: any, dtModificarUsuario: DtModificarUsuario) {
    return this.http.put(`${this.apiURL}/usuarios/${usuarioId}`, dtModificarUsuario);
  }

  getCompras(idUsuario: any) {
    return this.http.get<DtCompra[]>(`${this.apiURL}/usuarios/${idUsuario}/compras`);
  }

  getReclamos(idUsuario: any) {
    return this.http.get<DtReclamo[]>(`${this.apiURL}/usuarios/${idUsuario}/reclamos`);
  }

  async procesarPago(idDireccion: number, nroLocal: number, idUsuario: any, carrito: DtAltaArticulo[]): Promise<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain',
      }),
      responseType: 'text' as 'json',
    };

    let enlace: any;

    const data: DtAltaCompra = {
      nroLocal: Number(nroLocal),
      idComprador: Number(idUsuario),
      carrito: carrito,
    };

    if (idDireccion !== undefined && idDireccion.toString() !== '') {
      data.idDireccion = idDireccion;
    }
    await new Promise((resolve, _) => {
      this.http.post(`${this.apiURL}/compras`, data, httpOptions).subscribe((retorno) => {
        enlace = retorno;
        resolve(enlace);
      });
    });
    return enlace;
  }

  deleteUsuarios(idUsuario: any) {
    return this.http.delete(`${this.apiURL}/usuarios/${idUsuario}`);
  }

  showAlert(msg: string) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK'],
    });
    alert.then((alert) => alert.present());
  }

  altaReclamo(dtAltaReclamo: DtAltaReclamo) {
    return this.http.post(`${this.apiURL}/reclamos`, dtAltaReclamo);
  }

  establecerUsuarioTokenFCM(data: DtTokenUser, idUsuario: any) {
    return this.http.post(`${this.apiURL}/usuarios/${idUsuario}/tokens`, data);
  }
}
