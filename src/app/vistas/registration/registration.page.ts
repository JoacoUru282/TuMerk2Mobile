import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { BackEndError } from '../../modelos/dataTypes/BackEndError.interface';
import { DtRegistro } from '../../modelos/dataTypes/DtRegistro';
import { ApiService } from '../../servicios/api/api.service';
import { MessageUtil } from '../../servicios/api/message-util.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
})
export class RegistrationPage implements OnInit {

  constructor(private api: ApiService, private alertController: AlertController, private router: Router, private message: MessageUtil) { }
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
      this.emailFormControl.value === '' ||
      this.emailFormControl.value === null ||
      this.passwordFormControl.value === '' ||
      this.nameFormControl.value === '' ||
      this.apellidoFormControl.value === '' ||
      this.cedulaFormControl.value === ''
    ){
      this.message.showDialog('Error', 'Has dejado campos vacios');
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
            this.message.showDialog('Bien!', 'Te has registrado correctamente');
            this.router.navigate(['login']);
          },
          error: (err: BackEndError) => {
            this.showAlert(err.mensaje);
          },
        });
      }
      else{
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
