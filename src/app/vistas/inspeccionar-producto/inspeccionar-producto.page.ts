import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtGetProducto, DtProductoStorage } from '../../modelos/dataTypes/DtProducto';
import { DataService } from '../../servicios/data.service';

@Component({
    selector: 'app-inspeccionar-producto',
    templateUrl: './inspeccionar-producto.page.html',
    styleUrls: ['./inspeccionar-producto.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        SidebarComponent,
        NgIf,
    ],
})
export class InspeccionarProductoPage implements OnInit {
  productosCarrito: DtProductoStorage[];

  constructor(private dataService: DataService, private router: Router) { }

  producto: DtGetProducto
  async ngOnInit() {
    this.getProducto();
    this.inicializarProductoCarrito();
  }

  async getProducto(){
    this.producto = await this.dataService.getData('inspeccionarProducto');
  }

  calcularPreciofinal(precio: number, descuento: number){
    return precio * (1 - (descuento / 100));
  }

  goVerCarrito(){
    this.router.navigate(['ver-carrito']);
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

  async inicializarProductoCarrito(){
    const valorStorage = await this.dataService.getData('productosCarrito') || [];
    if(!valorStorage){
      await this.dataService.setData('productosCarrito', []);
    }else{
      this.productosCarrito = valorStorage;
    }
  }

}
