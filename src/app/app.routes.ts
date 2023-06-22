import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./vistas/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registrarse',
    loadComponent: () => import('./vistas/registration/registration.page').then( m => m.RegistrationPage)
  },
  {
    path: 'recuperar-contrasena',
    loadComponent: () => import('./vistas/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'local-list',
    loadComponent: () => import('./vistas/local-list/local-list.page').then( m => m.LocalListPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./vistas/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'alta-domicilio',
    loadComponent: () => import('./vistas/alta-domicilio/alta-domicilio.page').then( m => m.AltaDomicilioPage)
  },
  {
    path: 'list-productos/:idCat',
    loadComponent: () => import('./vistas/list-productos/list-productos.page').then( m => m.ListProductosPage)
  },
  {
    path: 'ver-carrito',
    loadComponent: () => import('./vistas/ver-carrito/ver-carrito.page').then( m => m.VerCarritoPage)
  },
  {
    path: 'inspeccionar-producto',
    loadComponent: () => import('./vistas/inspeccionar-producto/inspeccionar-producto.page').then( m => m.InspeccionarProductoPage)
  },
  {
    path: 'mi-perfil',
    loadComponent: () => import('./vistas/mi-perfil/mi-perfil.page').then( m => m.MiPerfilPage)
  },
  {
    path: 'edit-perfil',
    loadComponent: () => import('./vistas/edit-perfil/edit-perfil.page').then( m => m.EditPerfilPage)
  },
  {
    path: 'mis-compras',
    loadComponent: () => import('./vistas/mis-compras/mis-compras.page').then( m => m.MisComprasPage)
  },
  {
    path: 'alta-reclamo',
    loadComponent: () => import('./vistas/alta-reclamo/alta-reclamo.page').then( m => m.AltaReclamoPage)
  },
  {
    path: 'listar-reclamos',
    loadComponent: () => import('./vistas/listar-reclamos/listar-reclamos.page').then( m => m.ListarReclamosPage)
  },
  {
    path: 'ver-reclamo',
    loadComponent: () => import('./vistas/ver-reclamo/ver-reclamo.page').then( m => m.VerReclamoPage)
  },
];
