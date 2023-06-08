import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DtLogin } from 'src/app/modelos/dataTypes/DtLogin';
import { AlertController } from '@ionic/angular';
import { LoginResponse } from 'src/app/modelos/dataTypes/loginResponse.interface';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage  implements OnInit {
  constructor(
    private api: ApiService, 
    private alertController: AlertController, 
    private message: MessageUtil, 
    private router: Router, 
    private jwtService: JwtService) { }

  visibility: boolean = true;
  

  errorMessage: string = '';
  emailValido: boolean = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);

  ngOnInit(): void {}

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

 async login(){
    if(
      this.emailFormControl.value === '' ||
      this.emailFormControl.value === null ||
      this.passwordFormControl.value === ''
    ){
      this.message.showDialog('Error', 'Has dejado campos vacios');
    }else{
      if(this.isEmailOk(this.emailFormControl.value)){
        let data: DtLogin = {
          email: this.emailFormControl.value,
          contrasenia: this.passwordFormControl.value
        };
        this.api.login(data).subscribe({
          next:async (response: LoginResponse) => {
            await this.jwtService.guardarAccessTokenEnSesion(response.accessToken!);
            const rol = await this.jwtService.obtenerRol();
            if(rol === "COMPRADOR"){
              this.message.showDialog('', 'Te has logueado correctamente');
              this.router.navigate(['local-list']);
            }else{
              this.message.showDialog('Error', 'No sos usuario comprador');
            }
          },
          error: (err: BackEndError) => {
            this.showAlert(err.mensaje);
          }
        })
      }else{
        this.message.showDialog('Error', 'El email esta mal escrito');
      }
    }
  }

  showAlert(msg: string|undefined) {
		let alert = this.alertController.create({
			message: msg,
			header: 'Error',
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}
  

  isEmailOk(email: string): boolean{
    let mailOk = false;
    ('use strict');

    var EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(EMAIL_REGEX)){
      mailOk = true;
    }

    return mailOk;
  }

}
function wait(arg0: number) {
  throw new Error('Function not implemented.');
}

