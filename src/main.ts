import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { IonicStorageModule } from '@ionic/storage-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptor } from './app/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { DataService } from './app/servicios/api/data.service';

if (environment.production) {
  enableProdMode();
}

export function jwtOptionsFactory(dataService: DataService) {
	return {
		tokenGetter: () => {
			return dataService.getData('jwt');
		}
	};
}

bootstrapApplication(AppComponent, {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        importProvidersFrom(
            IonicModule.forRoot(),
            IonicStorageModule.forRoot(),
            JwtModule.forRoot({}),
            HttpClientModule,
            HttpClientXsrfModule.withOptions({
                cookieName: 'XSRF-TOKEN',
                headerName: 'X-XSRF-TOKEN'
            }),
            JwtModule.forRoot({
                jwtOptionsProvider: {
                    provide: JWT_OPTIONS,
                    useFactory: jwtOptionsFactory,
                    deps: [DataService]
                }
            }),
        ),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
    ]
})
  .catch(err => console.log(err));

  
