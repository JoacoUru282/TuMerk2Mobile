import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  recuperarPassForm = new FormGroup({
    email : new FormControl('', Validators.required)
  })

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private api: ApiService, private alertController: AlertController) { }

  ngOnInit(): void {}

 /* onResetPassword(form: any){
    
    console.log(form.usuario, form.password);
    this.api.resetPassword(form).subscribe(data =>{
        console.log(data);
      });
  }*/

  public async resetPassword(){
    if(this.emailFormControl.value == '' || this.emailFormControl.value == null){
      this.showAlert('Has dejado campos vacios');
    }else{
      if(this.esEmailValido(this.emailFormControl.value)){
        this.api.resetPassword(this.emailFormControl.value.toString()).subscribe({
          next: (response) => {
            this.showAlert('El mail se ha enviado correctamente');
          },
          error: (err) => {
            this.showAlert(err.error);
          }
        })
      }else {
        this.showAlert('El mail esta mal escrito');
      }
    }
  }

  showAlert(msg: string) {
		let alert = this.alertController.create({
			message: msg,
			header: 'Error',
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}

  esEmailValido(email: string): boolean{
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
