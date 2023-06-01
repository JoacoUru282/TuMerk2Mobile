import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DtAltaDomicilio } from 'src/app/modelos/dataTypes/DtDomicilio';
import { ApiService } from 'src/app/servicios/api/api.service';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-domicilio',
  templateUrl: './alta-domicilio.page.html',
  styleUrls: ['./alta-domicilio.page.scss'],
})
export class AltaDomicilioPage implements OnInit {

  MIN_LENGTH = 8;
  registrationForm!: FormGroup;
  calleFormControl = new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]);
  numeroFormControl = new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]);
  apartamentoFormControl = new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]);
  esquinaFormControl = new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]);

  constructor(private jwtService: JwtService, private api: ApiService, private message: MessageUtil, private router: Router) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   calle: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
    //   numero: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
    //   apartamento: new FormControl('', [Validators.minLength(this.MIN_LENGTH)]),
    //   esquina: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
    // });
  }


  async getIdUsuario() {
    return await this.jwtService.obtenerUsuarioId();
  }

  async darAlta() {
    if(this.calleFormControl.value === '' ||
      this.calleFormControl.value === null ||
      this.numeroFormControl.value === '' ||
      this.numeroFormControl.value === null ||
      this.apartamentoFormControl.value === '' ||
      this.apartamentoFormControl.value === null ||
      this.esquinaFormControl.value === '' ||
      this.esquinaFormControl.value === null){
        this.message.showDialog('Error', 'Has dejado campos vacios');
    }else{
        let dtAltaDomicilio: DtAltaDomicilio = {
          calle: this.calleFormControl.value,
          numero: this.numeroFormControl.value,
          apartamento: this.apartamentoFormControl.value,
          esquina: this.esquinaFormControl.value
        };
        const idUsuario = await this.getIdUsuario();
        this.api.altaDomicilio(dtAltaDomicilio, idUsuario).subscribe({
            next: (response) => {
              this.message.showDialog('Bien!', 'Domicilio dado de alta');
              this.registrationForm.reset();
            },
            error: (error) => {
              console.error(error);
            }
          }
        );
      }
    }
  


  goHome(){
    this.router.navigate(['/home']);
  }
}
