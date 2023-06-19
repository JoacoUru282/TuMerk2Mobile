import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtReclamo } from '../../modelos/dataTypes/DtCompra';
import { ApiService } from '../../servicios/api/api.service';
import { JwtService } from '../../servicios/api/jwt.service';

@Component({
    selector: 'app-listar-reclamos',
    templateUrl: './listar-reclamos.page.html',
    styleUrls: ['./listar-reclamos.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        SidebarComponent,
        NgFor,
    ],
})
export class ListarReclamosPage implements OnInit {

  constructor(private jwtService: JwtService, private api: ApiService) { }
  reclamo: DtReclamo[];

  async ngOnInit() {
    await this.getHistoricoReclamos();
  }

  async getHistoricoReclamos(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.reclamo = await new Promise((resolve, _) => 
      this.api.getReclamos(idUsuario).subscribe(
        response => resolve(response)));
  }

  fechaReclamo(date: DtReclamo){
    return new Date(date.fecha).toLocaleDateString();
  }

}
