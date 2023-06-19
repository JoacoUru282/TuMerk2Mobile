import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtAltaDomicilio } from '../../modelos/dataTypes/DtDomicilio';
import { ApiService } from '../../servicios/api/api.service';
import { JwtService } from '../../servicios/api/jwt.service';
import { MessageUtil } from '../../servicios/api/message-util.service';

@Component({
    selector: 'app-alta-domicilio',
    templateUrl: './alta-domicilio.page.html',
    styleUrls: ['./alta-domicilio.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        SidebarComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
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
