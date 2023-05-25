import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from 'src/app/modelos/dataTypes/Token.interface';

const TOKEN_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private dataService: DataService, private helper: JwtHelperService) {
  }

  
  guardarAccessTokenEnSesion(accessToken: string) {
    this.dataService.setData(TOKEN_KEY, accessToken);
  }

  async obtenerAccessTokenDeSesion() {
    return await this.dataService.getData(TOKEN_KEY);
  }

  async obtenerUsuarioId() {
    const accessToken = await this.obtenerAccessTokenDeSesion();
    const tokenCode: Token | null = this.helper.decodeToken(accessToken!);
    return tokenCode?.sub;
  }

  async obtenerUsuarioEmail() {
    const accessToken = await this.obtenerAccessTokenDeSesion();
    const tokenCode: Token | null = this.helper.decodeToken(accessToken!);
    return tokenCode?.email;
  }

  async obtenerRol() {
    const accessToken = await this.obtenerAccessTokenDeSesion();
    const tokenCode: Token | null = this.helper.decodeToken(accessToken!);
    return tokenCode?.scopes?.filter(scope => scope.includes("ROLE_")).map(scope => scope.replace("ROLE_", ""))[0];
  }
}
