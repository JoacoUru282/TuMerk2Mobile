import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DtReclamo } from 'src/app/modelos/dataTypes/DtCompra';
import { estadoReclamo } from 'src/app/modelos/enums/Reclamo';
import { ApiService } from 'src/app/servicios/api.service';
import { MessageUtil } from 'src/app/servicios/message-util.service';

@Component({
    selector: 'app-ver-reclamo',
    templateUrl: './ver-reclamo.page.html',
    styleUrls: ['./ver-reclamo.page.scss'],
    standalone: true,
    imports: [IonicModule, FormsModule, NgIf, NgFor],
})
export class VerReclamoPage implements OnInit {
  reclamo?: DtReclamo;
  nuevoMensaje: string = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private messageUtil: MessageUtil) {}

  ngOnInit() {
    this.getReclamo();
  }

  async getReclamo(){
    this.route.params.subscribe(async (params: Params) => {
      const idReclamo = params['id'];
      this.api.getReclamo(idReclamo).subscribe({
        next: (response) => {
          this.reclamo = response;
        },
      });
    })
  }

  parseFecha(date: string){
    return new Date(date).toLocaleDateString();
  }

  parseFechaHora(date: string){
    return new Date(date).toLocaleString();
  }

  async agregarMensaje() {
    if (this.nuevoMensaje === '') {
      this.messageUtil.showDialog("Error", "El mensaje no puede estar vacío");
      return;
    }

    this.route.params.subscribe(async (params: Params) => {
      const idReclamo = params['id'];
      this.api.getEnviarMensajeReclamo(idReclamo, this.nuevoMensaje).subscribe({
        next: (_) => {
          this.nuevoMensaje = '';
          this.messageUtil.showDialog("Información", "Mensaje Enviado!");
          this.getReclamo();
        },
      });
    })
  }

  isReclamoEstadoAbierto() {
    if (!this.reclamo)
      return false;
    
    const estado = estadoReclamo.ABIERTO
    const verificarEstado = Object.keys(estadoReclamo).find(
      (key) => estadoReclamo[key as keyof typeof estadoReclamo] === estado
    );

    return verificarEstado === this.reclamo.estado;
  }
}
