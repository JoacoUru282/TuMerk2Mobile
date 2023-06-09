import { Component, OnInit } from '@angular/core';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { DtDireccionUser, DtGetUsuario } from 'src/app/modelos/dataTypes/DtUsuario';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router, private jwtService: JwtService) { }

  categorias: DtCategoria[] = [];
  showCategories: boolean = false;
  productos: DtGetProducto[] = [];
  localId?: Number;
  user: DtGetUsuario;
  direccionCompleta: DtDireccionUser [] = [];


  ngOnInit(): void {
    this.obtenerCategorias();
    this.getLocal();
  }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  obtenerCategorias(){
    this.api.categoriasLocal().subscribe({
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
    const data = await this.dataService.getData('nroLocal');
    this.localId = Number(data);
    return data;
  }

  async getCategoria() {
    return this.dataService.getData('idCategoria');
  }

  async getIdUsuario() {
    return await this.jwtService.obtenerUsuarioId();
  }

  goToMiPerfil(){
     this.router.navigate(['mi-perfil']).then(() => {
      location.reload();   
    })
  }

  goToMisCompras(){
    this.router.navigate(['mis-compras']);
  }
}
