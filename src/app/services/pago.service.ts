import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrl = 'https://backend-rentas-126752734668.us-central1.run.app/api/pagos';

  constructor(private http: HttpClient) {}

  iniciarPagoPremium(body: any) {
    return this.http.post(`${this.apiUrl}/premium/iniciar`, body);
  }

  capturarPagoPremium(token: string) {
    return this.http.post(`${this.apiUrl}/premium/capturar?token=${token}`, {});
  }
}
