import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { Storage, IonicStorageModule }  from '@ionic/storage-angular'; 
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './plantillas/componets.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DataService } from './servicios/api/data.service';

export function jwtOptionsFactory(dataService: DataService) {
	return {
		tokenGetter: () => {
			return dataService.getData('jwt');
		}
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
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
