import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DtCompra, DtReclamo } from 'src/app/modelos/dataTypes/DtCompra';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { JwtService } from 'src/app/servicios/api/jwt.service';

@Component({
  selector: 'app-listar-reclamos',
  templateUrl: './listar-reclamos.page.html',
  styleUrls: ['./listar-reclamos.page.scss'],
})
export class ListarReclamosPage implements OnInit {

  constructor(private jwtService: JwtService,private dataService: DataService, private api: ApiService, private router: Router) { }
  reclamo: DtReclamo[];

  async ngOnInit() {
    await this.getHistoricoReclamos();
  }

  async getHistoricoReclamos(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.reclamo = await new Promise((resolve, _) => 
      this.api.getReclamos(idUsuario).subscribe(
        response => resolve(response)));
    console.log(this.reclamo)
    this.dataService.setData('reclamos', this.reclamo);
  }
  

  volver(){
    this.router.navigate(['home']);
  }

  fechaReclamo(date: DtReclamo){
    return new Date(date.fecha).toLocaleDateString();
  }

  altaReclamo(numCompra: number){
    this.dataService.setData('numeroDeCompra', numCompra);
    this.router.navigate(['alta-reclamo']);
  }

}
