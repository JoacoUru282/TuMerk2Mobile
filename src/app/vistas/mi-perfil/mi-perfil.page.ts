import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtDireccionUser, DtGetUsuario } from '../../modelos/dataTypes/DtUsuario';
import { ApiService } from '../../servicios/api/api.service';
import { JwtService } from '../../servicios/api/jwt.service';

@Component({
    selector: 'app-mi-perfil',
    templateUrl: './mi-perfil.page.html',
    styleUrls: ['./mi-perfil.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        SidebarComponent,
        FormsModule,
        NgFor,
    ],
})
export class MiPerfilPage implements OnInit {

  constructor(private api: ApiService, private jwtService: JwtService, private router: Router) { }

  usuario?: DtGetUsuario;
  direccionCompleta: DtDireccionUser [] ;


  async ngOnInit() {
    await this.getInfoUsuario();
    this.getDirecciones();
  }

  async getInfoUsuario(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.usuario = await new Promise((resolve, _) => 
      this.api.obtenerInfousuario(idUsuario).subscribe( 
        retorno => resolve(retorno) ));
  }

  getDirecciones(){
    this.direccionCompleta = this.usuario?.direcciones || [];
  }

  async quitarDireccion(idDireccion: number){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.api.deleteDireccion(idUsuario, idDireccion).subscribe({
      next: (response) => {
        const index = this.direccionCompleta.findIndex(dir => dir.id === idDireccion);
          if(index !== -1){
            this.direccionCompleta.splice(index, 1);
            }
          }
        })
  }

  goToEditPerfil(){
    this.router.navigate(['edit-perfil']);
  }

  goToDomicilio(){
    this.router.navigate(['alta-domicilio']);
  }

}

