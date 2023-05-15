import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api/api.service';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginI } from 'src/app/modelos/login.interface';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registerForm = new FormGroup({
    nombre : new FormControl('', Validators.required),
    apellido : new FormControl('', Validators.required),
    correo : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })
  constructor(private api: ApiService) { }

  ngOnInit(): void {}

  onRegister(form: any){
    
    console.log(form.usuario, form.password);
    this.api.register(form).subscribe(data =>{
        console.log(data);
      });
  }

}
