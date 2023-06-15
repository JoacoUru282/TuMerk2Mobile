import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';

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

  constructor(private api: ApiService, private messages: MessageUtil) { }

  ngOnInit(): void {}

  public async resetPassword(){
    if(this.emailFormControl.value === '' || this.emailFormControl.value === null){
      this.messages.showDialog('Error', 'Has dejado campos vacios');
    }else{
      if(this.esEmailValido(this.emailFormControl.value)){
        this.api.resetPassword(this.emailFormControl.value.toString()).subscribe({
          next: (response) => {
            this.messages.showDialog('Bien!', 'El mail se ha enviado correctamente');
          },
          error: (err: BackEndError) => {
            this.messages.showDialog('Error', 'Error');
          }
        })
      }else {
        this.messages.showDialog('Error', 'El mail esta mal escrito');
      }
    }
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
