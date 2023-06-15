import { DtGetProducto, DtProductoStorage } from 'src/app/modelos/dataTypes/DtProducto';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-inspeccionar-producto',
  templateUrl: './inspeccionar-producto.page.html',
  styleUrls: ['./inspeccionar-producto.page.scss'],
})
export class InspeccionarProductoPage implements OnInit {
  productosCarrito: DtProductoStorage[];

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router) { }

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
    this.storage.set('productosCarrito', this.productosCarrito);
  }

  async inicializarProductoCarrito(){
    const valorStorage = await this.storage.get('productosCarrito') || [];
    if(!valorStorage){
      await this.storage.set('productosCarrito', []);
    }else{
      this.productosCarrito = valorStorage;
    }
  }

}
