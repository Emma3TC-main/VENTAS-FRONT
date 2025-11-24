import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrl = 'http://localhost:8080/api/pagos';

  constructor(private http: HttpClient) {}

  iniciarPagoPremium(body: any) {
    return this.http.post(`${this.apiUrl}/premium/iniciar`, body);
  }

  capturarPagoPremium(token: string) {
    return this.http.post(`${this.apiUrl}/premium/capturar?token=${token}`, {});
  }
}
