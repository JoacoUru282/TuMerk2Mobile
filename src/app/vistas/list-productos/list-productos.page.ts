import { Component, OnInit } from '@angular/core';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Storage } from '@ionic/storage-angular';
import { DtProductoStorage } from 'src/app/modelos/dataTypes/DtProducto';
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.page.html',
  styleUrls: ['./list-productos.page.scss'],
})
export class ListProductosPage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router) { }

  productos: DtGetProducto[] = [];
  pageSize = 20;
  currentPage = 0;
  valMax: number = 0;
  totalPages?: number;
  nombreCategoria: string = '';
  filtroNombre: string = '';
  filtroMin?: number = 0
  filtroMax?: number;
  idCategoria?: string;
  localId?: Number;
  productosCategoria: DtGetProducto[];
  productosCarrito: DtProductoStorage[];

  async ngOnInit() {
    this.getProductoCategoria();
    this.calculateTotalPages();
    this.getNombreCategoría(Number(this.getCategoria()));
    this.inicializarProductoCarrito();
  }

  getLocal() {
    const data = this.storage?.get('nroLocal');
    this.localId = Number(data);
    return data;
  }

  async getProductoCategoria(){
    this.productosCategoria = await this.storage?.get('productosCategoria');
  }

  calcularPreciofinal(precio: number, descuento: number){
    return precio * (1 - (descuento / 100));
  }

  getCategoria() {
    return this.dataService.getData('idCategoria');
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.productos.length / this.pageSize);
  }

  getNombreCategoría(idCategoria) {
    this.api.categoriasLocal().subscribe({
      next: (response) => {
        let categorias = response
        categorias.forEach(element => {
          if (element.id === idCategoria)
            this.nombreCategoria = element.nombre
        });
      }
    });
  }

  // getProductos(): DtGetProducto[] {
  //   const startIndex = this.currentPage * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   let productosMostrados: DtGetProducto[];

  //   this.productos.forEach(element => {
  //     if (element.precio > this.valMax)
  //       this.valMax = element.precio
  //   });
    
  //   if (this.filtroNombre || this.filtroMin || this.filtroMax ) {
  //     const filtroLowerCase = this.filtroNombre.toLowerCase();

  //     productosMostrados = this.productos.filter(productos =>
  //       productos.nombre.toLowerCase().includes(filtroLowerCase) && 
  //       productos.precio <= this.filtroMax! && 
  //       productos.precio >= this.filtroMin!
  //     );

  //   } else {
  //     productosMostrados = this.productos;
  //   }

  //   return productosMostrados.slice(startIndex, endIndex);
  // }

  async inicializarProductoCarrito(){
    const valorStorage = await this.storage.get('productosCarrito') || [];
    if(!valorStorage){
      await this.storage.set('productosCarrito', []);
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
    this.storage.set('productosCarrito', this.productosCarrito);
  }

  goVerCarrito() {
    this.router.navigate(['ver-carrito']);
  }

  async onProductoClick(producto: DtGetProducto) {
    this.dataService.setData('inspeccionarProducto', producto);
    this.router.navigate(['inspeccionar-producto']);
  }

}