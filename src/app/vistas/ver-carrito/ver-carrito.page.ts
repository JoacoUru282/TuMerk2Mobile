import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { DtAltaArticulo } from '../../modelos/dataTypes/DtCompra';
import { DtProductoStorage } from '../../modelos/dataTypes/DtProducto';
import { DtDireccionUser } from '../../modelos/dataTypes/DtUsuario';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';
import { JwtService } from '../../servicios/jwt.service';
import { MessageUtil } from '../../servicios/message-util.service';

@Component({
    selector: 'app-ver-carrito',
    templateUrl: './ver-carrito.page.html',
    styleUrls: ['./ver-carrito.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgFor,
        NgIf,
        FormsModule,
    ],
})
export class VerCarritoPage implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private router: Router, private jwtService: JwtService, private platform: Platform, private message: MessageUtil) { }

  productosCarrito: DtProductoStorage[];
  precioTotal: number = 0;
  direccionCompleta: DtDireccionUser [] = [];
  listaDirecciones: boolean = false;
  idDireccion: number;
  retiroEnLocal: boolean = false;
  envioDomicilio: boolean = false;
  cupon: number = 0;

 async ngOnInit() {
    this.inicializarProductoCarrito();
    await this.getDirecciones();
    await this.calcularTotal();
    await this.cargarCupon();
  }

  goToHomeCategory(){
    this.router.navigate(['home']);
  }

  async inicializarProductoCarrito(){
    const valorStorage = await this.dataService.getData('productosCarrito') || [];
    if(!valorStorage){
      await this.dataService.setData('productosCarrito', []);
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
    this.dataService.setData('productosCarrito', this.productosCarrito);
    
    location.reload();
  }

  async agregarProductoCarrito(idProducto: number){
    for(let i = 0; i< this.productosCarrito.length; i++){
     if(this.productosCarrito[i].id === idProducto){
         this.productosCarrito[i].cantidadSeleccionada ++;
         break;
       }
    }
    this.dataService.setData('productosCarrito', this.productosCarrito);
    location.reload();
  }
  
  async calcularTotal(){
    if(this.productosCarrito !== null){
      for(let i = 0; i< this.productosCarrito.length; i++){
        this.precioTotal = this.precioTotal + this.productosCarrito[i].precio * this.productosCarrito[i].cantidadSeleccionada;
      }
    }
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
    this.dataService.removeData('productosCarrito');
    
    this.productosCarrito = [];
    this.precioTotal = 0;
    this.cupon = 0;

    if(enlace != null){
      if(enlace.includes('paypal')){
        this.platform.ready().then(( ) => {
          window.open(enlace, '_system');
        })
      }else{
        this.message.showDialog('', 'Has comprado utilizando tu cupon');
      }
      
    }
  }

  async getInfoUsuario(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    return await new Promise((resolve, _) => 
      this.api.obtenerInfousuario(idUsuario).subscribe( 
        retorno => resolve(retorno) ));
  }

  async cargarCupon(){
    const usuario: any = await this.getInfoUsuario();
    if(usuario != null){
      this.cupon = usuario.cupon;
    }
  }

}
