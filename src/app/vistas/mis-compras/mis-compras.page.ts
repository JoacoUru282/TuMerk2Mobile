import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { JwtService } from 'src/app/servicios/api/jwt.service';
import { Router } from '@angular/router';
import { DtCompra } from 'src/app/modelos/dataTypes/DtCompra';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.page.html',
  styleUrls: ['./mis-compras.page.scss'],
})
export class MisComprasPage implements OnInit {

  constructor(private jwtService: JwtService, private api: ApiService, private router: Router) { }
  compra: DtCompra[];

  async ngOnInit() {
    await this.getHistoricoCompras();
  }

  async getHistoricoCompras(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.compra = await new Promise((resolve, _) => 
      this.api.getCompras(idUsuario).subscribe(
        response => resolve(response)));
  }
  

  volver(){
    this.router.navigate(['home']);
  }

  fechaCompra(date: DtCompra){
    return new Date(date.fecha).toLocaleDateString();
  }

  altaReclamo(){
    this.router.navigate(['alta-reclamo']);
  }
}
