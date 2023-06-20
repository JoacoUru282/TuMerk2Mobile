import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtCompra } from '../../modelos/dataTypes/DtCompra';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';
import { JwtService } from '../../servicios/jwt.service';

@Component({
    selector: 'app-mis-compras',
    templateUrl: './mis-compras.page.html',
    styleUrls: ['./mis-compras.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        SidebarComponent,
        NgFor,
        NgIf,
    ],
})
export class MisComprasPage implements OnInit {

  constructor(private jwtService: JwtService,private dataService: DataService, private api: ApiService, private router: Router) { }
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

  fechaCompra(date: DtCompra){
    return new Date(date.fecha).toLocaleDateString();
  }

  altaReclamo(numCompra: number){
    this.dataService.setData('reclamoIdCompra', this.compra[numCompra].id);
    this.router.navigate(['alta-reclamo']);
  }
}
