import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtGetProducto, DtProductoStorage } from '../../modelos/dataTypes/DtProducto';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';



@Component({
    selector: 'app-list-productos',
    templateUrl: './list-productos.page.html',
    styleUrls: ['./list-productos.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        SidebarComponent,
        NgFor,
        NgIf,
    ],
})
export class ListProductosPage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private router: Router) { }

  productos: DtGetProducto[] = [];
  idCategoria?: string;
  productosCategoria: DtGetProducto[];
  productosCarrito: DtProductoStorage[];
  tituloCategoria: string;

  async ngOnInit() {
    this.inicializarProductoCarrito();
    this.getTituloCategoria();
    this.getProductoCategoria();
  }

  async getProductoCategoria(){
    this.productosCategoria = await this.dataService.getData('productosCategoria');
  }

  calcularPreciofinal(precio: number, descuento: number){
    return precio * (1 - (descuento / 100));
  }

  async getCategoria() {
    return await this.dataService.getData('idCategoria');
  }

  async inicializarProductoCarrito(){
    const valorStorage = await this.dataService.getData('productosCarrito') || [];
    if(!valorStorage){
      await this.dataService.setData('productosCarrito', []);
    }else{
      this.productosCarrito = valorStorage;
    }
  }

  async agregarProductoCarrito(producto: DtGetProducto) {
    let existe = false;
    for (let i = 0; i < this.productosCarrito.length; i++) {
      if (this.productosCarrito[i].id === producto.id) {
        this.productosCarrito[i].cantidadSeleccionada++;
        existe = true;
        break;
      }
    }
    if (!existe) {
      let precioFinalProducto: number = producto.precio;
      if (producto.promocion !== null) {
        precioFinalProducto = this.calcularPreciofinal(producto.precio, producto.promocion.porcentajeDescuento);
      }
      let variable: DtProductoStorage = {
        id: producto.id,
        nombre: producto.nombre,
        precio: precioFinalProducto,
        cantidadSeleccionada: 1
      };
      this.productosCarrito.push(variable);
    }
    this.dataService.setData('productosCarrito', this.productosCarrito);
  }

  goVerCarrito() {
    this.router.navigate(['ver-carrito']);
  }

  async onProductoClick(producto: DtGetProducto) {
    this.dataService.setData('inspeccionarProducto', producto);
    this.router.navigate(['inspeccionar-producto']);
  }

  async getTituloCategoria(){
    this.tituloCategoria= await this.dataService.getData('categoriaElegida');
    this.dataService.removeData('categoriaElegida');
  }

}