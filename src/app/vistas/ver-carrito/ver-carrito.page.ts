import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Storage } from '@ionic/storage-angular';
import { DtProductoStorage } from 'src/app/modelos/dataTypes/DtProducto';
import { Router } from '@angular/router';
import { DtDireccionCompleta } from 'src/app/modelos/dataTypes/DtDomicilio';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.page.html',
  styleUrls: ['./ver-carrito.page.scss'],
})
export class VerCarritoPage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router, private message: MessageUtil, private jwtService: JwtService) { }

  productosCarrito: DtProductoStorage[];
  precioTotal: number = 0;
  direccionCompleta: DtDireccionCompleta [] = [];
  listaDirecciones: boolean = false;

  ngOnInit() {
    this.inicializarProductoCarrito();
    //this.calcularTotal();
  }

  goToHomeCategory(){
    this.router.navigate(['home']);
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
  
  async calcularTotal(){
    if(this.productosCarrito !== null){
      for(let i = 0; i< this.productosCarrito.length; i++){
        this.precioTotal = this.precioTotal = this.productosCarrito[i].precio;
      }
    }
  }

  async getDirecciones(){
    const idUsuario = await this.getIdUsuario();
    await this.router.navigate(['ver-compra']).then(() => {
    this.api.obtenerDirecciones(idUsuario).subscribe({
      next: (response) => {
        this.direccionCompleta = response.direcciones;
        this.dataService.setData('direcciones', this.direccionCompleta);
      }
      });
    })
  }

  async getIdUsuario() {
    return await this.jwtService.obtenerUsuarioId();
  }

}
