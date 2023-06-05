import { Component, OnInit } from '@angular/core';
import { DtGetUsuario, DtUsuario } from 'src/app/modelos/dataTypes/DtUsuario';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';
import { DtDireccionCompleta } from 'src/app/modelos/dataTypes/DtDomicilio';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  constructor(private api: ApiService, private jwtService: JwtService, private message: MessageUtil, private dataService: DataService) { }

  usuario: any;
  direccionCompleta: DtDireccionCompleta [] = [];

   ngOnInit() {
    this.getInfoUsuario();
    this.getDirecciones();
  }

  getInfoUsuario(){
    this.usuario = this.dataService.getData('infoUsuario').then((data) => {
      this.usuario = data;
    })
  }

  async getDirecciones(){
    this.direccionCompleta = await this.dataService.getData('direcciones');
    console.log(this.direccionCompleta);
    if(this.direccionCompleta === null){
      this.message.showDialog('','No tiene ningun domicilio agregado');
    }
  }

  async quitarDireccion(idDireccion: number){
    for(let i = 0; i< this.direccionCompleta.length; i++){
      if(this.direccionCompleta[i].id === idDireccion){
        if(this.direccionCompleta[i].cantidadSeleccionada > 1){
          this.direccionCompleta[i].cantidadSeleccionada --;
        }else{
          this.direccionCompleta.splice(i, 1);
          break;
        }
      }
    }
     this.dataService.setData('direcciones', this.direccionCompleta);
  }

}
