/*import { ApiService } from 'src/app/servicios/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DtAltaReclamo } from 'src/app/modelos/dataTypes/DtCompra';
import { Token } from 'src/app/modelos/dataTypes/Token.interface';
import { DataService } from 'src/app/servicios/api/data.service';
import { JwtService } from 'src/app/servicios/api/jwt.service';
import { tipoReclamo } from 'src/app/modelos/enums/Reclamo';
import { APIError } from 'src/app/modelos/dataTypes/ApiError';

@Component({
  selector: 'app-alta-reclamo',
  templateUrl: './alta-reclamo.page.html',
  styleUrls: ['./alta-reclamo.page.scss'],
})
export class AltaReclamoPage implements OnInit {

  motivoFormControl = new FormControl('', [Validators.required, Validators.email])
  textoFormControl = new FormControl('', [Validators.required])
  tipoReclamoValues: string[] = Object.values(tipoReclamo)
  token: Token = { email: '', exp: 0, iat: 0, iss: '', scopes: [''], sub: 0 }
  compraId!: number


  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private helper: JwtHelperService,
  ) { }

  ngOnInit(): void {
    if (!this.auth()) {
      this.router.navigate(['']);
    }
    this.compraId =  Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.compraId)
  }

  auth(): boolean {
    const token = this.getToken();
    if (token != null) {
      try {
        this.token = this.helper.decodeToken(token!) as Token;
        if (this.token && this.token.scopes && this.token.scopes[0] === 'ROLE_COMPRADOR') {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  altaReclamo(): void {
    const motivo = this.motivoFormControl.value;
    let motivoReclamo: string;

    switch (motivo) {
      case 'Producto vencido':
        motivoReclamo = 'PRODUCTO_VENCIDO';
        break;
      case 'Producto Defectuoso':
        motivoReclamo = 'PRODUCTO_DEFECTUOSO';
        break;
      case 'Producto incorrecto':
        motivoReclamo = 'PRODUCTO_INCORRECTO';
        break;
      default:
        console.log('Debe indicar un motivo para su reclamo');
        return;
    }

    const { value: texto } = this.textoFormControl;

    if (!motivoReclamo || !texto) {
      console.log('Has dejado campos vacíos');
      return;
    } else {
      const dtAltaReclamo: DtAltaReclamo = {
        motivo: motivoReclamo,
        texto: texto,
        idCompra: this.compraId
      };
      this.apiService.altaReclamo(dtAltaReclamo).subscribe({
        next: (response) => {
          console.log('Se ha efectuado el reclamo', 'Cerrar');
          this.router.navigate(['']);
        },
        error: (err: APIError) => {
          console.log(err)
        }
      });
    }
  }

  validarCaracteres(): void {
    const { value: texto } = this.textoFormControl;
    if (texto && texto.length > 350) {
      this.textoFormControl.setValue(texto.substr(0, 350));
    }
  }


  getToken(): string {
    return JSON.stringify(localStorage.getItem('token'));
  }

}*//////////////////////////////////////////////////////////////////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DtAltaReclamo, DtCompra } from 'src/app/modelos/dataTypes/DtCompra';
import { Token } from 'src/app/modelos/dataTypes/Token.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { JwtService } from 'src/app/servicios/api/jwt.service';
import { tipoReclamo } from 'src/app/modelos/enums/Reclamo';
import { APIError } from 'src/app/modelos/dataTypes/ApiError';
import { DataService } from 'src/app/servicios/api/data.service';

@Component({
  selector: 'app-alta-reclamo',
  templateUrl: './alta-reclamo.page.html',
  styleUrls: ['./alta-reclamo.page.scss'],
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
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private helper: JwtHelperService,
    private formBuilder: FormBuilder
  ) {
    this.reclamoForm = this.formBuilder.group({
      motivoFormControl: ['', Validators.required],
      textoFormControl: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    /*if (!this.auth()) {
      this.router.navigate(['']);
    }*/
    await this.getCompras();
    await this.getCompraReclamo();
    await this.getCompraId();
  }
  
  async getCompras(): Promise<void> {
    this.compras = await this.dataService.getData('compras');
  }

  async getCompraReclamo(): Promise<void> {
    this.compraReclamo = await this.dataService.getData('numeroDeCompra');
  }

  async getCompraId(): Promise<void> {
    this.compraId = await this.compras[this.compraReclamo].id;
  }

  auth(): boolean {
    const token = this.getToken();
    if (token != null) {
      try {
        this.token = this.helper.decodeToken(token!) as Token;
        if (this.token && this.token.scopes && this.token.scopes[0] === 'ROLE_COMPRADOR') {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }
  
  

  altaReclamo(): void {
    if (this.compraId <= 0) {
      console.log('El identificador de la compra debe ser un número positivo');
      return;
    }
    
    const motivo = this.reclamoForm.get('motivoFormControl')?.value;
    console.log("este es el motivo", motivo);
    let motivoReclamo: string;

    switch (motivo) {
      case 'Producto vencido':
        motivoReclamo = 'PRODUCTO_VENCIDO';
        break;
      case 'Producto Defectuoso':
        motivoReclamo = 'PRODUCTO_DEFECTUOSO';
        break;
      case 'Producto incorrecto':
        motivoReclamo = 'PRODUCTO_INCORRECTO';
        break;
      default:
        console.log('Debe indicar un motivo para su reclamo');
        return;
    }

    const texto = this.reclamoForm.get('textoFormControl')?.value;
    console.log("este es el texto", texto);

    if (!motivoReclamo || !texto) {
      console.log('Has dejado campos vacíos');
      return;
    } else {
      const dtAltaReclamo: DtAltaReclamo = {
        motivo: motivoReclamo,
        texto: texto,
        idCompra: this.compraId
      };
      this.apiService.altaReclamo(dtAltaReclamo).subscribe({
        next: (response) => {
          console.log('Se ha efectuado el reclamo', response);
          this.router.navigate(['']);
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

  getToken(): string {
    return JSON.stringify(localStorage.getItem('token'));
  }
}

