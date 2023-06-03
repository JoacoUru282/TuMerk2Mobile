import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Storage } from '@ionic/storage-angular';
import { DtProductoStorage } from 'src/app/modelos/dataTypes/DtProducto';
import { DtGetProducto } from 'src/app/modelos/dataTypes/DtProducto';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.page.html',
  styleUrls: ['./ver-carrito.page.scss'],
})
export class VerCarritoPage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage) { }

  productosCarrito: DtProductoStorage[];

  ngOnInit() {
    this.inicializarProductoCarrito();
  }

  async inicializarProductoCarrito(){
    const valorStorage = await this.storage.get('productosCarrito') || [];
    if(!valorStorage){
      await this.storage.set('productosCarrito', []);
    }else{
      this.productosCarrito = valorStorage;
    }
  }

  async quitarProductoCarrito(idProducto: number){
    for(let i = 0; i< this.productosCarrito.length; i++){
      if(this.productosCarrito[i].id === idProducto){
        if(this.productosCarrito[i].cantidadSeleccionada > 1){
          this.productosCarrito[i].cantidadSeleccionada --;
        }else{
          this.productosCarrito.splice(i, 1);
          break;
        }
      }
    }
     this.storage.set('productosCarrito', this.productosCarrito);
   }

   async agregarProductoCarrito(idProducto: number){
    for(let i = 0; i< this.productosCarrito.length; i++){
     if(this.productosCarrito[i].id === idProducto){
         this.productosCarrito[i].cantidadSeleccionada ++;
         break;
       }
    }
    this.storage.set('productosCarrito', this.productosCarrito);
  }
}
