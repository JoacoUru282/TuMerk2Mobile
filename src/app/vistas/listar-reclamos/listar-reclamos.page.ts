import { Component, OnInit } from '@angular/core';
import { DtReclamo } from 'src/app/modelos/dataTypes/DtCompra';
import { ApiService } from 'src/app/servicios/api/api.service';
import { JwtService } from 'src/app/servicios/api/jwt.service';

@Component({
  selector: 'app-listar-reclamos',
  templateUrl: './listar-reclamos.page.html',
  styleUrls: ['./listar-reclamos.page.scss'],
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
