import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';
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

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router) { }

  producto: DtGetProducto
  async ngOnInit() {
    this.getProducto();
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

}
