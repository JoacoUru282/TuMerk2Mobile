import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DtLogin } from 'src/app/modelos/dataTypes/DtLogin';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/servicios/api/data.service';
import { LoginResponse } from 'src/app/modelos/dataTypes/loginResponse.interface';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage  implements OnInit {
  constructor(private api: ApiService, private alertController: AlertController, private dataService: DataService, private message: MessageUtil) { }

  visibility: boolean = true;
  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

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

 public login(){
    if(
      this.emailFormControl.value == '' ||
      this.emailFormControl.value == null ||
      this.passwordFormControl.value == ''
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
            this.dataService.setData('jwt', response.accessToken);
            this.message.showDialog('Error', 'Iniciaste sesion correctamente');
            //para obtener el jwt
            //const jwt = await this.dataService.getData('jwt');
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
