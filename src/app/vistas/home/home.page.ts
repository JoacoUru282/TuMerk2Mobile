import { Component, OnInit } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { DtTokenUser } from '../../modelos/dataTypes/DtUsuario';
import { ApiService } from '../../servicios/api.service';
import { DataService } from '../../servicios/data.service';
import { JwtService } from '../../servicios/jwt.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [IonicModule, SidebarComponent],
})
export class HomePage implements OnInit {

  constructor(private api: ApiService, private jwtService: JwtService, private dataService: DataService) { }


  ngOnInit() {
    this.inicializarNotificacionesFirebase();
  }
  
  /* =========================== NOTIFICACIONES FIREBASE =========================== */

  async inicializarNotificacionesFirebase() {
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('[FCM] Registration success. Token: ' + token.value);
        this.dataService.setData("mobileTokenFCM", token.value)
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('[FCM] Error on registration: ' + JSON.stringify(error));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('[FCM] pushNotificationActionPerformed: ' + JSON.stringify(notification));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('[FCM] Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.checkPermissions().then(result => {
      if (result.receive === 'granted') {
        console.log('[FCM] checkPermissions() granted');
        this.enviarUsuarioToken();
      }
      else {
        console.log('[FCM] checkPermissions() not granted');

        PushNotifications.requestPermissions().then(result2 => {
          if (result2.receive === 'granted') {
            console.log('[FCM] requestPermissions() granted');
            this.enviarUsuarioToken();
          }
          else {
            console.log('[FCM] requestPermissions() not granted');
          }
        });
      }
    });
  }

  private async enviarUsuarioToken() {
    const mobileToken = await this.dataService.getData("mobileTokenFCM")

    if (mobileToken)
      this.establecerUsuarioTokenFCM(mobileToken);
  }

  private async establecerUsuarioTokenFCM(tokenFCM: string) {
    const idUsuario = await this.jwtService.obtenerUsuarioId();

    const data: DtTokenUser = {
      token: tokenFCM,
      tipo: "FCM_REGISTRATION"
    }

    this.api.establecerUsuarioTokenFCM(data, idUsuario).subscribe({
      error: (e) => console.error(e)
    });
  }
  
  /* =========================== NOTIFICACIONES FIREBASE =========================== */
}
