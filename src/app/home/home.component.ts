import { Component } from '@angular/core';
import { EburgerService } from '../services/eburger.service';
import { CommonModule } from '@angular/common';
import { CentavosParaReaisPipe } from "../pipes/centavos-para-reais.pipe";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CentavosParaReaisPipe,ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  list_txt:any
  list_item:any;
  list_burger_select:any;
  defaultBurgerId: number = 1; // id que você quer setar de início
  item_cart: any=0;
  sendLogin!:FormGroup;

  constructor(private eburger: EburgerService, private toastr: ToastrService, private fb: FormBuilder){

  }

  ngOnInit(){
    this.eburger.getEburgers().subscribe((data:any)=>{
      console.log("todos os textos", data);
      this.list_txt = data;
    });

    this.itemsMenu();
    this.loadBurger(this.defaultBurgerId);

    this.getItemCart();
             this.sendLogin = this.fb.group({
            email: ["", Validators.required],
            senha: ["", Validators.required],

  
          });

  }

  itemsMenu(){
    this.eburger.getItemMenu().subscribe((data:any)=>{
      console.log("itens do menu", data);
      this.list_item = data;

    })
  }
  selectItem(e:any){
    console.log("item selecionado", e);

  }

  loadBurger(id: number){
  
    this.eburger.searchBurger(id).subscribe((data:any)=>{
      console.log(data);
      this.list_burger_select = data;
      this.eburger.getEburgers().subscribe((data:any)=>{
        console.log("todos os textos", data);
        this.list_txt = data;
      });
      

    })
  }
  // continua tratando o evento normalmente
  selectBurger(e: Event) {
    const inputValue = (e.target as HTMLInputElement).value;
      console.log(inputValue);
    this.loadBurger(Number(inputValue));
  }

  logar(){

  }
addCart(i:string){
    console.log("burger no cart", i);
    // localStorage.setItem("burger_cart", i);
    this.eburger.add_cart_burger(i).subscribe((data:any)=>{
      console.log("item adicionado ao carrinho",data);
      this.toastr.show("Mensagem", data.message);
        this.getItemCart();
    })

}
getItemCart(){
  this.eburger.getItemCartAll().subscribe((data:any)=>{
    console.log("todoos os itens do meu carrinho", data);
    this.item_cart = data?.length ?? 0;
    console.log("quantidade carrinho", this.item_cart);
  })
}
}
