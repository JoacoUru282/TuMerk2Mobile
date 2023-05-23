import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DtLogin } from 'src/app/modelos/dataTypes/DtLogin';


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
		return this.http.post(`${this.apiURL}/auth/contrasenia/recuperacion`, email);
	}

	logout() {
		this.storage.remove(TOKEN_KEY).then(() => {
			this.authenticationState.next(false);
		});
	}

	// esta funcion representa las posibilidades del usuario una vez que inicio sesión
	// posteriormente sera eliminada
	getSpecialData() {
		return this.http.get(`${this.apiURL}/special`).pipe(
			catchError((e) => {
				let status = e.status;
				if (status === 401) {
					this.showAlert('You are not authorized for this!');
					this.logout();
				}
				throw new Error(e);
			})
		);
	}

	isAuthenticated() {
		return this.authenticationState.value;
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