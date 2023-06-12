import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create(); 
  }
    
  // public async getData(key: string): Promise<any> {
  //   const data = await this.storage?.get(key);
  //   return data;
  // }

  getData(key: string): Promise<any> {
    return this.storage?.get(key).then(value => value);
  }

  setData(key: string, value: any) {
    this.storage?.set(key, value);
  }

  removeData(key: string) {
    this.storage?.remove(key);
  }

  removeAll(){
    this.storage?.clear();
  }

  
}
