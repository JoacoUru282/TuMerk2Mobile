import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./vistas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./vistas/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'recuperar-contraseña',
    loadChildren: () => import('./vistas/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'local-list',
    loadChildren: () => import('./vistas/local-list/local-list.module').then( m => m.LocalListPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./vistas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'alta-domicilio',
    loadChildren: () => import('./vistas/alta-domicilio/alta-domicilio.module').then( m => m.AltaDomicilioPageModule)
  },  {
    path: 'list-productos',
    loadChildren: () => import('./vistas/list-productos/list-productos.module').then( m => m.ListProductosPageModule)
  },
  {
    path: 'ver-carrito',
    loadChildren: () => import('./vistas/ver-carrito/ver-carrito.module').then( m => m.VerCarritoPageModule)
  }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
