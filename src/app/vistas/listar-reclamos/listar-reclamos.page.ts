import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DtReclamo } from '../../modelos/dataTypes/DtCompra';
import { ApiService } from '../../servicios/api.service';
import { JwtService } from '../../servicios/jwt.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listar-reclamos',
    templateUrl: './listar-reclamos.page.html',
    styleUrls: ['./listar-reclamos.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        NgFor,
    ],
})
export class ListarReclamosPage implements OnInit {

  constructor(private jwtService: JwtService, private api: ApiService, private router: Router) { }

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

  goToVerReclamo(id: number) {
    this.router.navigate(['ver-reclamo', id]);
  }
}
