import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Storage } from '@ionic/storage-angular';
import { DtProductoStorage } from 'src/app/modelos/dataTypes/DtProducto';
import { Router } from '@angular/router';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { DtDireccionUser } from 'src/app/modelos/dataTypes/DtUsuario';
import { DtAltaArticulo } from 'src/app/modelos/dataTypes/DtCompra';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.page.html',
  styleUrls: ['./ver-carrito.page.scss'],
})
export class VerCarritoPage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router, private message: MessageUtil, private jwtService: JwtService) { }

  productosCarrito: DtProductoStorage[];
  precioTotal: number = 0;
  direccionCompleta: DtDireccionUser [] = [];
  listaDirecciones: boolean = false;
  idDireccion: number;
  retiroEnLocal: boolean = false;
  envioDomicilio: boolean = false;

 async ngOnInit() {
    this.inicializarProductoCarrito();
    await this.getDirecciones();
    //this.calcularTotal();
  }

  goToHomeCategory(){
    this.router.navigate(['home']);
  }

  async inicializarProductoCarrito(){
    const valorStorage = await this.dataService.getData('productosCarrito') || [];
    console.log(valorStorage);
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

  async getIdUsuario() {
    return await this.jwtService.obtenerUsuarioId();
  }

  async getDirecciones(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.direccionCompleta = await new Promise((resolve, _) => 
			this.api.obtenerDirecciones(idUsuario).subscribe( 
        retorno => resolve(retorno.direcciones) ));  
  }
  
  seleccionarEnvioDomicilio(){
    this.envioDomicilio = true;
    this.retiroEnLocal = false;
  }

  seleccionarRetiroLocal(){
    this.retiroEnLocal = true;
    this.envioDomicilio = false;
  }

  async pago(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    const productosArticuloCarrito: DtAltaArticulo[] = [];
    this.productosCarrito.forEach((producto: DtProductoStorage) => {
      const productoArticulo: DtAltaArticulo = {idProducto: producto.id, cantidad: producto.cantidadSeleccionada};
      productosArticuloCarrito.push(productoArticulo);
    });
    const nroLocal = await this.dataService.getData('nroLocal');
    const enlace = await this.api.procesarPago(this.idDireccion, nroLocal, idUsuario, productosArticuloCarrito);
    console.log(enlace);
    if(enlace != null){
      window.location.href = enlace;
      //this.abrirEnlace(enlace);
    }
    
  }

  abrirEnlace(url: string) {
    //const browser = this.inAppBrowser.create(url, '_system');
  }

}
