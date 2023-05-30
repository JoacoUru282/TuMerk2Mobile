import { Component, OnInit } from '@angular/core';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';
import { ApiService } from 'src/app/servicios/api/api.service';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Storage } from '@ionic/storage-angular';
import { SidebarComponent } from 'src/app/plantillas/sidebar/sidebar.component';


@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.page.html',
  styleUrls: ['./list-productos.page.scss'],
})
export class ListProductosPage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage) { }

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
  productosCategoria: any;

  ngOnInit() {
    this.getProductoCategoria();
    this.calculateTotalPages();
    this.getNombreCategoría(Number(this.getCategoria()));
  }

  getLocal() {
    const data = this.storage?.get('nroLocal');
    this.localId = Number(data);
    return data;
  }

  async getProductoCategoria(){
    this.productosCategoria = await this.storage?.get('productosCategoria');
  }

  getCategoria() {
    return this.dataService.getData('idCategoria');
  }

  getProductosLocal(idLocal: number){
    this.api.obtenerProductosLocal(idLocal).subscribe({
      next: (response) => {
        this.productos = response;
      }
    });
  }

  obtenerProductoDeCategoria(local: number, categoria: number) {
    this.api.obtenerProductosDeCategoria(local, categoria).subscribe({
      next: (response) => {
        this.productos = response;
      }
    });
  }

  obtenerProductos() {
    this.api.obtenerProductos().subscribe({
      next: (response) => {
        this.productos = response
      }
    });
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.productos.length / this.pageSize);
  }

  getNombreCategoría(idCategoria) {
    this.api.obtenerCategorias(true).subscribe({
      next: (response) => {
        let categorias = response
        categorias.forEach(element => {
          if (element.id === idCategoria)
            this.nombreCategoria = element.nombre
        });
      }
    });
  }

  getProductos(): DtGetProducto[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    let productosMostrados: DtGetProducto[];

    this.productos.forEach(element => {
      if (element.precio > this.valMax)
        this.valMax = element.precio
    });
    
    if (this.filtroNombre || this.filtroMin || this.filtroMax ) {
      const filtroLowerCase = this.filtroNombre.toLowerCase();

      productosMostrados = this.productos.filter(productos =>
        productos.nombre.toLowerCase().includes(filtroLowerCase) && 
        productos.precio <= this.filtroMax! && 
        productos.precio >= this.filtroMin!
      );

    } else {
      productosMostrados = this.productos;
    }

    return productosMostrados.slice(startIndex, endIndex);
  }


  
}
