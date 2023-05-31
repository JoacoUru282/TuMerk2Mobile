import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DtAltaDomicilio } from 'src/app/modelos/dataTypes/DtDomicilio';
import { ApiService } from 'src/app/servicios/api/api.service';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alta-domicilio',
  templateUrl: './alta-domicilio.page.html',
  styleUrls: ['./alta-domicilio.page.scss'],
})
export class AltaDomicilioPage implements OnInit {

  MIN_LENGTH = 8;
  registrationForm!: FormGroup;

  constructor(private jwtService: JwtService, private api: ApiService, private message: MessageUtil) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      calle: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      apartamento: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
      esquina: new FormControl('', [Validators.required, Validators.minLength(this.MIN_LENGTH)]),
    });
  }


  getIdUsuario() {
    const idUsuario = this.jwtService.obtenerUsuarioId();
    return idUsuario;
  }

  darAlta() {
    if (this.registrationForm.valid) {
      const dtAltaDomicilio: DtAltaDomicilio = {
        calle: this.registrationForm.value.calle,
        numero: this.registrationForm.value.numero,
        apartamento: this.registrationForm.value.apartamento,
        esquina: this.registrationForm.value.esquina,
      };

      const idUsuario = this.getIdUsuario();

      console.log(dtAltaDomicilio);

      this.api.altaDomicilio(dtAltaDomicilio, idUsuario).subscribe(
        {
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

  
}
