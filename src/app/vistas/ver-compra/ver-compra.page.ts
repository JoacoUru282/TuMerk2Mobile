declare var Braintree;
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Storage } from '@ionic/storage-angular';
import { DtDireccionCompleta } from 'src/app/modelos/dataTypes/DtDomicilio';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';

@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.page.html',
  styleUrls: ['./ver-compra.page.scss'],
})
export class VerCompraPage implements OnInit {

  constructor(private api: ApiService, private storage: Storage, private router: Router, private jwtService: JwtService, private dataService: DataService, private message: MessageUtil) { }

  direccionCompleta: DtDireccionCompleta [] = [];
  listaDirecciones: boolean = false;
  direccion: string = '';
  retiroEnLocal: boolean = false;
  envioDomicilio: boolean = false;

  ngOnInit() {
    
  }

  async getDirecciones(){
    this.direccionCompleta = await this.dataService.getData('direcciones');
    console.log(this.direccionCompleta);
    if(this.direccionCompleta === null){
      this.message.showDialog('Advertencia','No tiene ningun domicilio agregado');
    }
  }

  seleccionarEnvioDomicilio(){
    this.getDirecciones();
    console.log(this.getDirecciones());
    this.envioDomicilio = true;
    this.retiroEnLocal = false;
  }

  seleccionarRetiroLocal(){
    this.retiroEnLocal = true;
    this.envioDomicilio = false;
  }

  pago(){
    Braintree.initialize('YOUR_CLIENT_TOKEN', Braintree.PayPalEnvironment.Sandbox, (clientErr, clientInstance) => {
      // Handle any error that occurs during client initialization
  
      clientInstance.presentDropInPaymentUI({
        amount: '10.00', // Set the payment amount
        currency: 'USD', // Set the currency code
        primaryDescription: 'Your Product Description',
      }, (paymentErr, paymentResult) => {
        // Handle any error that occurs during payment process
  
        if (paymentResult.userCancelled) {
          // User cancelled the payment
        } else {
          // Payment successful
          const paymentNonce = paymentResult.nonce;
          // Process the payment nonce on your server
        }
      });
    });
  }

}
