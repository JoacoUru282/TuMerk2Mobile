import { Component, OnInit } from '@angular/core';

import { IonicModule, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from './servicios/api/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent  {
	public appPages = [
		/*{ title: 'Login', url: '/login', icon: 'log-in' },
		{ title: 'Register', url: '/register', icon: 'document-text' },*/
		{ title: 'Categorias', url: '/home', icon: 'log-in' },
		
		
	];
	public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
	constructor() {
	}

	
}