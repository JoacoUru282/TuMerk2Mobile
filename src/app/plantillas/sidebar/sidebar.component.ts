import { Component, OnInit } from '@angular/core';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router) { }

  categorias: DtCategoria[] = [];
  showCategories: boolean = false;
  productos: DtGetProducto[] = [];
  localId?: Number;

  ngOnInit(): void {
    this.obtenerCategorias(true);
    this.getLocal();
  }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  obtenerCategorias(boolean: boolean){
    this.api.categoriasLocal(boolean).subscribe({
      next: (response) => {
        this.categorias = response 
      }
    });
  }

  async verProductosPorCategoria(idCategoria: number){
    this.dataService.setData('idCategoria', idCategoria);
    await this.router.navigate(['list-productos']).then(() => {
      this.api.obtenerProductosDeCategoria(Number(this.localId), idCategoria).subscribe({
        next: (response) => {
          this.productos = response;
          location.reload();
          this.dataService.setData('productosCategoria', this.productos);
        }
      });
    });
  }

  async getLocal() {
    const data = await this.storage?.get('nroLocal');
    this.localId = Number(data);
    return data;
  }

  async getCategoria() {
    return this.dataService.getData('idCategoria');
  }

  goAltaDomicilio(){
    this.router.navigate(['/alta-domicilio']);
  }
}
