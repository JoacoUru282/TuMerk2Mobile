import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPerfilPageRoutingModule } from './mi-perfil-routing.module';

import { MiPerfilPage } from './mi-perfil.page';
import { ComponentsModule } from 'src/app/plantillas/componets.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MiPerfilPageRoutingModule
  ],
  declarations: [MiPerfilPage]
})
export class MiPerfilPageModule {}
