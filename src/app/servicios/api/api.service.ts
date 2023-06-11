import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DtLogin } from 'src/app/modelos/dataTypes/DtLogin';
import { Local } from 'src/app/modelos/dataTypes/Local.interface';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';
import { DtAltaDomicilio } from 'src/app/modelos/dataTypes/DtDomicilio';
import { DtGetUsuario, DtUsuario } from 'src/app/modelos/dataTypes/DtUsuario';
import { DtModificarUsuario } from 'src/app/modelos/dataTypes/DtUsuario';
import { DtAltaArticulo, DtAltaCompra, DtCompra } from 'src/app/modelos/dataTypes/DtCompra';

const TOKEN_KEY = 'access_token';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	user = null;
	authenticationState = new BehaviorSubject(false);

	apiURL: string = `${environment.BACKEND_API_URL}`;

	constructor(
		private http: HttpClient,
		private helper: JwtHelperService,
		private storage: Storage,
		private plt: Platform,
		private alertController: AlertController
	) {
		this.plt.ready().then(() => {
			this.checkToken();
		});
	}

	checkToken() {
		this.storage.get(TOKEN_KEY).then((token) => {
			if (token) {
				let decoded = this.helper.decodeToken(token);
				let isExpired = this.helper.isTokenExpired(token);

				if (!isExpired) {
					this.user = decoded;
					this.authenticationState.next(true);
				} else {
					this.storage.remove(TOKEN_KEY);
				}
			}
		});
	}

	register(credentials: any) {
		return this.http.post(`${this.apiURL}/auth/registro`, credentials).pipe(
			catchError((e) => {
				console.log("soy el error" + e);
				throw new Error(e);
			})
		);
	}

	login(credentials: DtLogin) {
		return this.http.post(`${this.apiURL}/auth/login`, credentials).pipe(
			tap((res) => {
				this.authenticationState.next(true);
			}),
			catchError((e) => {
				throw new Error(e);
			})
		);
	}

	resetPassword(email: string) {
		return this.http.post(`${this.apiURL}/auth/contrasenia/recuperar?email=${email}`, '');
	}

	logout() {
		this.storage.remove(TOKEN_KEY).then(() => {
			this.authenticationState.next(false);
		});
	}

	misLocales(abierto: Boolean): Observable <Local[]>{
		return this.http.get<Local[]>(`${this.apiURL}/locales?abierto=${abierto}`);
	}

	categoriasLocal(){
		return this.http.get<DtCategoria[]>(`${this.apiURL}/categorias?publico=true`);
	}

	//Te trae todos los productos
	obtenerProductos() {
		return this.http.get<DtGetProducto[]>(`${this.apiURL}/productos`);
	}
	
	//Te trae un producto de UN local en especifico
	obtenerProductoDeLocal(localId:number, productoId: number){
		return this.http.get<DtGetProducto>(`${this.apiURL}/locales/${localId}/productos/${productoId}`)
	}

	//Te trae un producto en especifico
	obtenerProducto(productoId: number){
		return this.http.get<DtGetProducto>(`${this.apiURL}/productos/${productoId}`)
	}

	//Obtenes todos los productos de un local especifico
	obtenerProductosLocal(idLocal: number): Observable <DtGetProducto[]>{
		return this.http.get<DtGetProducto[]>(`${this.apiURL}/locales/${idLocal}/productos`);
	}

	//Obtenes los productos de un local segun la categoria
	obtenerProductosDeCategoria(idLocal:number, idCategoria: number){
		return this.http.get<DtGetProducto[]>(`${this.apiURL}/locales/${idLocal}/productos?idCategoria=${idCategoria}`);
	}

	altaDomicilio(dtAltaDomicilio: DtAltaDomicilio, idUsuario: any) {
        return this.http.post(`${this.apiURL}/usuarios/${idUsuario}/direcciones`, dtAltaDomicilio);
    }

	obtenerDirecciones(usuarioId: any) {
		return this.http.get<any>(`${this.apiURL}/usuarios/${usuarioId}`);
	}

	deleteDireccion(idUsuario: any, idDireccion: number){
		return this.http.delete(`${this.apiURL}/usuarios/${idUsuario}/direcciones/${idDireccion}`);
	}

	obtenerInfousuario(usuarioId: any){
		return this.http.get<any>(`${this.apiURL}/usuarios/${usuarioId}`);
	}
	  
	modificarUsuario(usuarioId: any, dtModificarUsuario: DtModificarUsuario) {
		return this.http.put(`${this.apiURL}/usuarios/${usuarioId}`,dtModificarUsuario)
	}

	getCompras(idUsuario: any){
		return this.http.get<DtCompra[]>(`${this.apiURL}/usuarios/${idUsuario}/compras`);
	}

	obtenerCupon(idUsuario: any){
		return this.http.get<any>(`${this.apiURL}/usuarios/${idUsuario}`);
	}

	async procesarPago(idDireccion: number, nroLocal: number, idUsuario: any, carrito: DtAltaArticulo []): Promise<string> {
		const httpOptions = {
		  headers: new HttpHeaders({
			'Accept': 'text/plain'
		  }),
		  responseType: 'text' as 'json'
		};
	  
		let enlace: any;

		const data: DtAltaCompra = {
			nroLocal: Number(nroLocal),
			idComprador: Number(idUsuario),
			carrito: carrito,
		};
		
		if (idDireccion !== undefined && idDireccion.toString() !== "") {
			data.idDireccion = idDireccion;
		}
		await new Promise((resolve, _) => {
			this.http.post(`${this.apiURL}/compras`, data, httpOptions).subscribe(
			  (retorno) => {
				enlace = retorno;
				resolve(enlace);
			  }
			);
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
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}

	
}