import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DtRegistro } from 'src/app/modelos/dataTypes/DtRegistro';
import { AlertController } from '@ionic/angular';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private api: ApiService, private alertController: AlertController) { }
  MIN_NAME_LENGHT = 8;
  visibility: boolean = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(this.MIN_NAME_LENGHT)]);
  apellidoFormControl = new FormControl('',[Validators.required]);
  cedulaFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  public async onRegister(){
    if(
      this.emailFormControl.value == '' ||
      this.emailFormControl.value == null ||
      this.passwordFormControl.value == '' ||
      this.nameFormControl.value == '' ||
      this.apellidoFormControl.value == '' ||
      this.cedulaFormControl.value == ''
    ){
      this.showAlert('Has dejado campos vacios');
    }else{
      if (this.esEmailValido(this.emailFormControl.value)) {
        let data: DtRegistro = {
          nombre: this.nameFormControl.value,
          apellido: this.apellidoFormControl.value,
          contrasenia: this.passwordFormControl.value,
          email: this.emailFormControl.value,
          cedula: Number(this.cedulaFormControl.value)
        };
        this.api.register(data).subscribe({
          next: () => {
            this.showAlert('Te has registrado correctamente')
          },
          error: (err: BackEndError) => {
            this.showAlert(err.mensaje);
          },
        });
      }
      else{
        this.showAlert("El email esta mal escrito");
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

  esEmailValido(email: string): boolean {
    let mailValido = false;
    ('use strict');

    var EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)) {
      mailValido = true;
    }
    return mailValido;
  }
}
