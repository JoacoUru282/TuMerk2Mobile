import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BackEndError } from '../../modelos/dataTypes/BackEndError.interface';
import { DtCategoria } from '../../modelos/dataTypes/DtCategoria';
import { Local } from '../../modelos/dataTypes/Local.interface';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';
import { MessageUtil } from '../../servicios/message-util.service';


@Component({
    selector: 'app-local-list',
    templateUrl: './local-list.page.html',
    styleUrls: ['./local-list.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        NgFor,
    ],
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
  }

  onLocalClick(local: Local) {
    this.dataService.setData('nroLocal', local.nro);
    this.router.navigate(['home']);
  }

  onFormSubmit() {
    // Acciones a realizar al enviar el formulario
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

}
