import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtGetUsuario, DtModificarUsuario } from '../../modelos/dataTypes/DtUsuario';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';
import { JwtService } from '../../servicios/jwt.service';
import { MessageUtil } from '../../servicios/message-util.service';

@Component({
    selector: 'app-edit-perfil',
    templateUrl: './edit-perfil.page.html',
    styleUrls: ['./edit-perfil.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        SidebarComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class EditPerfilPage implements OnInit {

  constructor(
    private jwtService: JwtService, 
    private api: ApiService, 
    private dataService: DataService,
    private message: MessageUtil, 
    private router: Router) { }

  usuario?: DtGetUsuario;
  contraseniaFormControl = new FormControl('');
  confirmarFormControl = new FormControl('');
  guardarUsuario: any;
  ci: any
  nombre: any;
  apellido: any;
  contrasenia: any;
  idUsuario: any;
  
  async ngOnInit() {
    await this.getInfoUsuario();
  }

  async getInfoUsuario(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.usuario = await new Promise((resolve, _) => 
      this.api.obtenerInfousuario(idUsuario).subscribe( 
        retorno => resolve(retorno) ));
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
    const idUsuario = await this.jwtService.obtenerUsuarioId();
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

  async deleteUser(){
    const idUsuario = await this.jwtService.obtenerUsuarioId();
    this.api.deleteUsuarios(idUsuario).subscribe({
      next: async (response) => {
        await this.dataService.removeAll();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message.showDialog('Error', 'Error al eliminar');
      }
    })
  }

}
