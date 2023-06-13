import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';
import { DtGetProducto, DtProductoStorage } from 'src/app/modelos/dataTypes/DtProducto';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private router: Router) { }

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
  categorias: DtCategoria[] = [];
  productosDescuento: DtGetProducto[] = [];
  

  async ngOnInit() {
    this.getLocal();
    this.getProductosDescuento();
    this.inicializarProductoCarrito();
  }

  async getLocal() {
    const data = await this.dataService.getData('nroLocal');
    this.localId = Number(data);
    return data;
  }

  async getProductoCategoria(){
    this.productosCategoria = await this.dataService.getData('productosCategoria');
  }

  
  async getProductosDescuento() {
    await this.obtenerCategorias();
    let idsCategorias: number[] = this.categorias.map((categoria) => categoria.id);
  
    for (const categoriaId of idsCategorias) {
      this.api.obtenerProductosDeCategoria(Number(this.localId), categoriaId).subscribe({
        next: (response) => {
          let largo = response.length;
          for (var i = 0; i < largo; i++) { 
            if (response[i].promocion?.porcentajeDescuento > 0) { 
              console.log("esta tiene promo", response[i]);
              
              const nuevoProducto: DtGetProducto = {
                id: response[i].id,
                nombre: response[i].nombre,
                descripcion: response[i].descripcion,
                precio: response[i].precio,
                imagen: response[i].imagen,
                idCategoria: response[i].idCategoria,
                cantidadStock: response[i].cantidadStock,
                promocion: {
                  id: response[i].promocion.id,
                  porcentajeDescuento: response[i].promocion.porcentajeDescuento
                }
              };

              this.productosDescuento.push(nuevoProducto);
            }
          }
        }
      });
    }
  
    console.log("proDescuentos", this.productosDescuento);
  }
  
  
  
  

  

  async obtenerCategorias(){
    this.categorias = await this.dataService.getData('categorias');
  }

  calcularPreciofinal(precio: number, descuento: number){
    return precio * (1 - (descuento / 100));
  }

  async getCategoria() {
    return await this.dataService.getData('idCategoria');
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.productos.length / this.pageSize);
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
  
}
