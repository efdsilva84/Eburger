import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
};

@Injectable({
  providedIn: 'root'
})
export class EburgerService {

  constructor(private api: ApiService) { }

  getEburgers() {
    return this.api.get('api/eburger/eburger_txt', false, httpOptions);
  }
  getItemMenu() {
    return this.api.get('api/eburger/itens_mn', false, httpOptions);
  }
  searchBurger(id:any) {
    return this.api.get(`api/eburger/search_burger/${id}`, false, httpOptions);
  }

  
}
