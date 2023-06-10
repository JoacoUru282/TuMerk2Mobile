import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { JwtService } from 'src/app/servicios/api/jwt.service';
import { Router } from '@angular/router';
import { DtDireccionUser, DtGetUsuario } from 'src/app/modelos/dataTypes/DtUsuario';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  constructor(private api: ApiService, private jwtService: JwtService, private router: Router) { }

  usuario?: DtGetUsuario;
  direccionCompleta: DtDireccionUser [] ;


  async ngOnInit() {
    await this.getInfoUsuario();
    console.log(this.usuario);
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

