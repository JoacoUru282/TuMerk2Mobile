import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/api/data.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-folder',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private dataService: DataService, private api: ApiService) { }


  ngOnInit() {
    this.inicializarNotificacionesFirebase();
  }
  
  /* =========================== FIREBASE NOTIFICATIONS =========================== */


  async inicializarNotificacionesFirebase() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('[FCM] Usuario decidió no recibir notificaciones en tu dispositivo');
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('[FCM] Registration success. Token: ' + token.value);
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
  }
}
