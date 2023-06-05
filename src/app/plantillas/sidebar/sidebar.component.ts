import { Component, OnInit } from '@angular/core';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { DtGetUsuario } from 'src/app/modelos/dataTypes/DtUsuario';
import { DtDireccionCompleta } from 'src/app/modelos/dataTypes/DtDomicilio';

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
  direccionCompleta: DtDireccionCompleta [] = [];

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

  async getUserInfo(){
    const idUsuario = await this.getIdUsuario();
    this.api.obtenerInfousuario(idUsuario).subscribe(data =>{
      console.log(data);
      this.user = data;
      this.dataService.setData('infoUsuario', this.user);
      this.router.navigate(['mi-perfil']);
    })
  }

  async getIdUsuario() {
    return await this.jwtService.obtenerUsuarioId();
  }

  async getDirecciones(){
    const idUsuario = await this.getIdUsuario();
    await this.router.navigate(['mi-perfil']).then(() => {
    this.api.obtenerDirecciones(idUsuario).subscribe({
      next: (response) => {
        this.direccionCompleta = response.direcciones;
        location.reload();
        this.dataService.setData('direcciones', this.direccionCompleta);
      }
      });
    })
  }

  async goMiPerfil(){
    this.getUserInfo();
    this.getDirecciones();
  }
}
