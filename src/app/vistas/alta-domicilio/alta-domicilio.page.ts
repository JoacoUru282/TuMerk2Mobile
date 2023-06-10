import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DtAltaDomicilio } from 'src/app/modelos/dataTypes/DtDomicilio';
import { ApiService } from 'src/app/servicios/api/api.service';
import { JwtService } from 'src/app/servicios/api/jwt.service';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-domicilio',
  templateUrl: './alta-domicilio.page.html',
  styleUrls: ['./alta-domicilio.page.scss'],
})
export class AltaDomicilioPage implements OnInit {

  MIN_LENGTH = 8;
  registrationForm!: FormGroup;
  calleFormControl = new FormControl('', [Validators.required]);
  numeroFormControl = new FormControl('', [Validators.required]);
  apartamentoFormControl = new FormControl('');
  esquinaFormControl = new FormControl('');

  constructor(private jwtService: JwtService, private api: ApiService, private message: MessageUtil, private router: Router) { }

  ngOnInit() {
  
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
        const idUsuario = await this.jwtService.obtenerUsuarioId();
        this.api.altaDomicilio(dtAltaDomicilio, idUsuario).subscribe({
            next: (response) => {
              this.router.navigate(['home']);
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
