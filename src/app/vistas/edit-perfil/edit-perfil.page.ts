import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DtModificarUsuario } from 'src/app/modelos/dataTypes/DtUsuario';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { JwtService } from 'src/app/servicios/api/jwt-service.service';
import { MessageUtil } from 'src/app/servicios/api/message-util.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {

  constructor(private jwtService: JwtService, private api: ApiService, private dataService: DataService, private message: MessageUtil, private router: Router) { }

  usuario: any;
  contraseniaFormControl = new FormControl('');
  confirmarFormControl = new FormControl('');
  guardarUsuario: any;
  ci: any
  nombre: any;
  apellido: any;
  contrasenia: any;
  idUsuario: any;
  
  ngOnInit() {
    this.getInfoUsuario();
  }

  async getIdUsuario() {
    return await this.jwtService.obtenerUsuarioId();
  }

  getInfoUsuario(){
    this.usuario = this.dataService.getData('infoUsuario').then((data) => {
      this.usuario = data;
    })
  }

  async modificarUsuario(){
    let dtModificarUsuario: DtModificarUsuario = { }
    if(this.contrasenia === '' && this.nombre === '' && this.apellido === '' && this.ci === ''){
      this.message.showDialog('Error', 'Todos los campos estan vacios');
      return;
    }
    if (this.contrasenia !== '') {
      if(this.contraseniaFormControl.value !== this.confirmarFormControl.value){
        this.message.showDialog('Error', 'Las contraseñas no coinciden');
        return;
      }
      dtModificarUsuario.contrasenia = this.contrasenia; 
    }
    if (this.contrasenia !== '') {
      dtModificarUsuario.cedula = this.ci;
    }
    if (this.contrasenia !== '') {
      dtModificarUsuario.nombre = this.nombre;
    }
    if (this.contrasenia !== '') {
      dtModificarUsuario.apellido = this.apellido;
    }
    const idUsuario = await this.getIdUsuario();
    this.api.modificarUsuario(idUsuario, dtModificarUsuario).subscribe({
      next: (response) => {
        this.message.showDialog('', 'Se ha modificado la informacion del usuario');
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.message.showDialog('Error', 'Error al modificar');
      }
    });
  }

  goToPerfil(){
    this.router.navigate(['mi-perfil']);
  }

}
