import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/shared/models/config';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }
  getConfig(resourceRef: string): Observable<Config> {
    return this.http.get<Config>(`api/application/${resourceRef}/getConfig`);
  }
}
