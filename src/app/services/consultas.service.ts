import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ConsultasService {

  constructor(private http: HttpClient) { }

  getPosts() {
    let url="http://ergast.com/api/f1/2024/drivers.json";
    return this.http.get(url);
  }


}
