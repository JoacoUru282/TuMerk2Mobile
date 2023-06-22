import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { BackEndError } from '../../modelos/dataTypes/BackEndError.interface';
import { DtLogin } from '../../modelos/dataTypes/DtLogin';
import { LoginResponse } from '../../modelos/dataTypes/loginResponse.interface';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';
import { JwtService } from '../../servicios/jwt.service';
import { MessageUtil } from '../../servicios/message-util.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
})
export class LoginPage  implements OnInit {
  constructor(
    private api: ApiService, 
    private messageUtil: MessageUtil, 
    private router: Router, 
    private jwtService: JwtService,
    private dataService: DataService,
    private loadingController: LoadingController) { }

  visibility: boolean = true;
  

  errorMessage: string = '';
  emailValido: boolean = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.dataService.getData('jwt').then(jwt => {
      if (jwt && !this.jwtService.isThisTokenExpired(jwt)) {
        this.dataService.getData('nroLocal').then(nroLocal => {
            if (nroLocal) {
              this.router.navigate(['home']);
            } else {
              this.router.navigate(['local-list']);
            }
        });
      }
    });
  }
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();
  }

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

 async login(){
    if(
      this.emailFormControl.value === '' ||
      this.emailFormControl.value === null ||
      this.passwordFormControl.value === ''
    ){
      this.messageUtil.showDialog('Error', 'Has dejado campos vacios');
    }else{
      if(this.isEmailOk(this.emailFormControl.value)){
        let data: DtLogin = {
          email: this.emailFormControl.value,
          contrasenia: this.passwordFormControl.value
        };
        this.showLoading();
        this.api.login(data).subscribe({
          next:async (response: LoginResponse) => {
            this.loadingController.dismiss();
            await this.jwtService.guardarAccessTokenEnSesion(response.accessToken!);
            const rol = await this.jwtService.obtenerRol();
            if(rol === "COMPRADOR"){
              this.router.navigate(['local-list']);
            }else{
              this.messageUtil.showDialog('Error', 'Solo el rol comprador tiene permitido iniciar sesión por el mobile');
            }
          },
          error: (err: BackEndError) => {
            this.loadingController.dismiss();
            this.messageUtil.showBackendError(err);
          }
        })
      }else{
        this.messageUtil.showDialog('Error', 'El email no es válido');
      }
    }
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

