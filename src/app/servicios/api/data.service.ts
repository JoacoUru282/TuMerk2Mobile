import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
  }

  private _storage: Storage | null = null;

  async init() {
    this._storage = await this.storage.create(); 
  }

  getData(key: string): any {
    return this._storage?.get(key).then(value => value);
  }

  setData(key: string, value: any) {
    this._storage?.set(key, value);
  }

  removeData(key: string) {
    this._storage?.remove(key);
  }
}
