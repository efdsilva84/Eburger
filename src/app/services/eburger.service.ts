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
    add_cart_burger(data:any) {
    return this.api.post('api/eburger/add_item_cart', data, httpOptions);
  }
    getItemCartAll() {
    return this.api.get('api/eburger/get_cart_item', false, httpOptions);
  }

  
}
