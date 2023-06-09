import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  getData(key: string): Promise<any> {
    return this.storage?.get(key).then((value) => value);
  }

  setData(key: string, value: any) {
    this.storage?.set(key, value);
  }

  removeData(key: string) {
    this.storage?.remove(key);
  }

  async removeAll() {
    const mantenerValor = await this.getData('mobileTokenFCM');
    await this.storage?.clear();
    await this.setData('mobileTokenFCM', mantenerValor);
  }
}
