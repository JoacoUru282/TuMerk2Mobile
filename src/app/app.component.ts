import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from './servicios/data.service';
import { ApiService } from './servicios/api.service';
import { DtGetProducto } from './modelos/dataTypes/DtProducto';
import { DtCategoria } from './modelos/dataTypes/DtCategoria';

interface AppPage {
  title: string;
  icon?: string;
  url?: string | string[];
  childsExpand?: boolean;
  childsList?: any[];
  hideSidebar?: boolean;
  hideMenuOption?: boolean;
  preventNavigation?: boolean;
  execute?: (...args: any[]) => Promise<any>;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  puedenVerSidebar: string[] = ['/home', '/mi-perfil', '/mis-compras', '/listar-reclamos', '/list-productos'];
  mostrarSidebar: boolean = false;

  categorias: DtCategoria[];
  mostrarCategorias: boolean = false;

  constructor(private router: Router, private dataService: DataService, private api: ApiService) {}

  ngOnInit() {
    this.verificarVerSidebar();
    this.obtenerCategorias();
  }

  private verificarVerSidebar() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarSidebar = this.puedenVerSidebar.includes(event.url);
      }
    });
  }

  obtenerCategorias() {
    this.api.categoriasLocal().subscribe({
      next: (response) => (this.categorias = response),
    });
  }

  menuInicio() {
    this.router.navigate(['home']);
  }

  menuMiPerfil() {
    this.router.navigate(['mi-perfil']);
  }

  menuMisCompras() {
    this.router.navigate(['mis-compras']);
  }

  menuMisReclamos() {
    this.router.navigate(['listar-reclamos']);
  }

  menuCambiarLocal() {
    this.router.navigate(['local-list']);
  }

  menuCategorias() {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  menuCategoria(idCat: any, nombreCat: any) {
    this.mostrarCategorias = !this.mostrarCategorias;
    this.router.navigate(['list-productos', idCat], { queryParams: { nombreCat } });
  }

  async menuCerrarSesion() {
    await this.dataService.removeAll();
    this.router.navigate(['/login']).then(_ => location.reload());
  }
}
