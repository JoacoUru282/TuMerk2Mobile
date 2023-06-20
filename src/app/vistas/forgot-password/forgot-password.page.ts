import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackEndError } from '../../modelos/dataTypes/BackEndError.interface';
import { ApiService } from '../../servicios/api.service';
import { MessageUtil } from '../../servicios/message-util.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
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
