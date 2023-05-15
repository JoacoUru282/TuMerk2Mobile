import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  recuperarPassForm = new FormGroup({
    email : new FormControl('', Validators.required)
  })

  constructor(private api: ApiService) { }

  ngOnInit(): void {}

  onResetPassword(form: any){
    
    console.log(form.usuario, form.password);
    this.api.resetPassword(form).subscribe(data =>{
        console.log(data);
      });
  }

}
