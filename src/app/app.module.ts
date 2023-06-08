import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './servicios/api/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Storage, IonicStorageModule }  from '@ionic/storage-angular'; 
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './plantillas/componets.module';

export function jwtOptionsFactory(storage: Storage) {
	return {
		tokenGetter: () => {
			return storage.get('access_token');
		},
		whitelistedDomains: ['localhost:5000']
	};
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		ComponentsModule,
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		HttpClientXsrfModule.withOptions({
		cookieName: 'XSRF-TOKEN',
		headerName: 'X-XSRF-TOKEN'
		}),
		IonicStorageModule.forRoot(),
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [Storage]
			}
		}),
  BrowserAnimationsModule
	],
	providers: [
		/*StatusBar,
		SplashScreen,*/
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
