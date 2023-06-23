import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { APIError } from '../../modelos/dataTypes/ApiError';
import { DtAltaReclamo, DtCompra } from '../../modelos/dataTypes/DtCompra';
import { Token } from '../../modelos/dataTypes/Token.interface';
import { tipoReclamo } from '../../modelos/enums/Reclamo';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';
import { MessageUtil } from '../../servicios/message-util.service';

@Component({
    selector: 'app-alta-reclamo',
    templateUrl: './alta-reclamo.page.html',
    styleUrls: ['./alta-reclamo.page.scss'],
    standalone: true,
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    ],
})
export class AltaReclamoPage implements OnInit {
  reclamoForm: FormGroup;
  tipoReclamoValues: string[] = Object.values(tipoReclamo);
  token: Token = { email: '', exp: 0, iat: 0, iss: '', scopes: [''], sub: 0 };
  compraReclamo!: number;
  compraId!: number;
  compras: DtCompra[];

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private message: MessageUtil
  ) {
    this.reclamoForm = this.formBuilder.group({
      motivoFormControl: ['', Validators.required],
      textoFormControl: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getCompraId();
  }

  async getCompraId(): Promise<void> {
    this.compraId = await this.dataService.getData('reclamoIdCompra');
    this.dataService.removeData('reclamoIdCompra');
  }

  altaReclamo(): void {
    if (this.compraId <= 0) {
      this.message.showDialog('', 'El identificador de la compra debe ser un número positivo');
      return;
    }
    
    const motivo = this.reclamoForm.get('motivoFormControl')?.value;
    let motivoReclamo: string;

    switch (motivo) {
      case 'Producto Vencido':
        motivoReclamo = 'PRODUCTO_VENCIDO';
        break;
      case 'Producto Defectuoso':
        motivoReclamo = 'PRODUCTO_DEFECTUOSO';
        break;
      case 'Producto Incorrecto':
        motivoReclamo = 'PRODUCTO_INCORRECTO';
        break;
      default:
        this.message.showDialog('', 'Debe indicar un motivo para su reclamo');
        return;
    }

    const texto = this.reclamoForm.get('textoFormControl')?.value;

    if (!motivoReclamo || !texto) {
      this.message.showDialog('', 'Has dejado campos vacíos');
      return;
    } else {
      const dtAltaReclamo: DtAltaReclamo = {
        motivo: motivoReclamo,
        texto: texto,
        idCompra: this.compraId
      };
      this.apiService.altaReclamo(dtAltaReclamo).subscribe({
        next: (_) => {
          this.message.showDialog('Información', 'Has agregado el reclamo correctamente!');
          this.router.navigate(['home']);
        },
        error: (err: APIError) => {
          console.log(err);
        }
      });
    }
  }

  validarCaracteres(): void {
    const texto = this.reclamoForm.get('textoFormControl')?.value;
    if (texto && texto.length > 350) {
      this.reclamoForm.get('textoFormControl')?.setValue(texto.substr(0, 350));
    }
  }

}

