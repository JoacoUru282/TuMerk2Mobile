import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.page.html',
  styleUrls: ['./local-list.page.scss'],
})
export class LocalListPage implements OnInit {

  constructor() { }

  locales: any[] = [
    { nombre: 'Local 1' },
    { nombre: 'Local 2' },
    { nombre: 'Local 3' }
  ];

  ngOnInit() {
  }

  onLocalClick(local: any) {
    // Acciones a realizar cuando se hace clic en un local
    console.log('Local seleccionado:', local);
  }

  onFormSubmit() {
    // Acciones a realizar al enviar el formulario
    console.log('Formulario enviado');
  }

}
