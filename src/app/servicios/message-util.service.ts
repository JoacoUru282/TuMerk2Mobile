import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BackEndError } from '../modelos/dataTypes/BackEndError.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageUtil {
  constructor(private alertController: AlertController) {}

  async showDialog(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async showBackendError(err: BackEndError) {
    const errorDefault = {
      header: 'Error',
      message: err.error.mensaje,
      buttons: ['OK'],
    };

    const error400 = {
      header: 'Error',
      message: err.error.detalles && err.error.detalles.length > 0 ? err.error.detalles.join('\n') : err.error.mensaje,
      buttons: ['OK'],
    };

    let error;

    switch (err.status) {
      case 400:
        error = error400;
        break;
      case 401:
        error = errorDefault;
        break;
      case 404:
        error = errorDefault;
        break;
      case 500:
        error = errorDefault;
        break;
      default:
        error = errorDefault;
        console.log(err);
        break;
    }

    const alert = await this.alertController.create(error);
    await alert.present();
  }
}
