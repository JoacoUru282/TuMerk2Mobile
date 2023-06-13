import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Local } from 'src/app/modelos/dataTypes/Local.interface';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Router } from '@angular/router';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';


@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.page.html',
  styleUrls: ['./local-list.page.scss'],
})
export class LocalListPage implements OnInit {

  constructor(
    private api: ApiService,
    private message: MessageUtil,
    private dataService: DataService,
    private router: Router
    ) { }

  locales: Local[] = [];
  categorias: DtCategoria[];

  ngOnInit() {
    this.getLocales();
    this.setearCategorias();
  }

  onLocalClick(local: Local) {
    this.dataService.setData('nroLocal', local.nro);
    this.router.navigate(['home']);
  }

  onFormSubmit() {
    // Acciones a realizar al enviar el formulario
    console.log('Formulario enviado');
  }

  public getLocales(){
    this.api.misLocales(true).subscribe({
      next: (response: Local[]) => {
        this.locales = response;
      },
      error: (err: BackEndError) => {
        this.message.showDialog('Error', 'Error')
      }
    })
  }

  setearCategorias(){
    this.api.categoriasLocal().subscribe({
      next: (response) => {
        this.categorias = response 
        this.dataService.setData('categorias', this.categorias)
      }
    });
  }

}
