import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService: JwtService) { }

  async getToken() {
    return await this.jwtService.obtenerAccessTokenDeSesion();
  }

  async isAuthenticated(): Promise<boolean> {
    return this.jwtService.isTokenExpired();
  }
}
