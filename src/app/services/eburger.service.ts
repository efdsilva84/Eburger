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
    return this.api.get('eburger/eburger_txt', false, httpOptions);
  }
  getItemMenu() {
    return this.api.get('eburger/itens_mn', false, httpOptions);
  }
  searchBurger(id:any) {
    return this.api.get(`eburger/search_burger/${id}`, false, httpOptions);
  }
    add_cart_burger(data:any) {
    return this.api.post('eburger/add_item_cart', data, httpOptions);
  }
    getItemCartAll(id:any) {
    return this.api.get(`eburger/get_cart_item/${id}`, false, httpOptions);
  }
  cad_user_eburger(id:any) {
    return this.api.post(`eburger/cad_user_eburger/${id}`, id, httpOptions);
  }
    logar(data:any) {
    return this.api.post('eburger/login', data, httpOptions);
  }
    deleteItemCart(id_item:any) {
    return this.api.get(`eburger/delete_item_cart/${id_item}`, id_item, httpOptions);
  }
  
}
