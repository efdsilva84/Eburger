import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EburgerService } from '../services/eburger.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CentavosParaReaisPipe } from "../pipes/centavos-para-reais.pipe";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CentavosParaReaisPipe,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  list_txt:any
  list_item:any;
  list_burger_select:any;
  defaultBurgerId: number = 1; // id que você quer setar de início
  item_cart: any=0;
  item_cart2: any=0;

  sendLogin!:FormGroup;
  cadastro!:FormGroup
  userLogado:any;
  id_usuario:any;
  totalCarrinho:any;
  url_img!:string;


  constructor(private eburger: EburgerService, private toastr: ToastrService, private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object, private router: Router, private api: ApiService
  ){

  }

  ngOnInit():void{
      this.url_img = this.api.url_sistema + "/application/imagens/"
      console.log('url da imagem', this.url_img);

                 this.sendLogin = this.fb.group({
            email: ["", Validators.required],
            senha: ["", Validators.required],
          });

            this.cadastro = this.fb.group({
            nome: ["", Validators.required],
            email: ["", Validators.required],
            cpf: ["", Validators.required],
            senha: ["", Validators.required],
          });
  const user = localStorage.getItem("user");
 this.id_usuario = localStorage.getItem("id_user");


  if(user){
        this.userLogado = user ? user.charAt(0).toUpperCase() + user.slice(1) : null;
          console.log('id recuperado',this.id_usuario);


  }
    this.eburger.getEburgers().subscribe((data:any)=>{
      console.log("todos os textos", data);
      this.list_txt = data;
    });
    this.itemsMenu();
    this.loadBurger(this.defaultBurgerId);
    this.loaderApp();
    this.getItemCart(this.id_usuario);


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

  loaderApp(){
    const id = Number(localStorage.getItem('id')!);

    console.log("id do usuario", id);
     

  }

  logar(){
    console.log(this.sendLogin.value);
    this.eburger.logar(this.sendLogin.value).subscribe((data:any)=>{
      console.log("login realizado", data);
      if(data.status == true){
        this.sendLogin.reset();
        this.toastr.success("Logins realizado com sucesso");
        localStorage.setItem("user", data[0].nome);
            localStorage.setItem("id", data[0].id_user);
             const user = localStorage.getItem("user");
             this.getItemCart(this.id_usuario);
  if(user){
        this.userLogado = user ? user.charAt(0).toUpperCase() + user.slice(1) : null;

  }
      }else if(data.status == false){
        this.toastr.error(data.message);
      }
    })

  }

  sair(){
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    this.router.navigate(['home']);

  }
addCart(i:any){
    console.log("burger no cart", i);
    let us = localStorage.getItem("user");
    if(us){
             // Cria um novo objeto juntando o produto + id_usuario
  const payload = {
    ...i, // todos os campos do objeto i
    id_cliente: Number(this.id_usuario) // garante que vai como número
  };
      // localStorage.setItem("burger_cart", i);
    this.eburger.add_cart_burger(payload).subscribe((data:any)=>{
      console.log("item adicionado ao carrinho",data);
      this.toastr.success("Mensagem", data.message);
        this.getItemCart(this.id_usuario);
    })
    }else{
      this.toastr.warning("Cadastra-se ou faça login !")
    }
}
getItemCart(id:number){
  this.id_usuario = Number(localStorage.getItem('id')!);
  this.eburger.getItemCartAll(this.id_usuario).subscribe((data:any)=>{
    console.log("todoos os itens do meu carrinho", data);
    this.item_cart2 = data;
    this.item_cart = data?.length ?? 0;
    this.totalCarrinho = this.item_cart2.reduce((acc:any, item:any) => acc + Number(item.preco_eburger), 0);

    console.log("quantidade carrinho", this.item_cart);
  })
}
deleteItemCart(id_item_cart:any){
  console.log('id a remover do carrinho', id_item_cart)

const pay = { id_item: id_item_cart };

  
    console.log('paylaod de delete', pay);
    this.eburger.deleteItemCart(Number(id_item_cart)).subscribe((data:any)=>{
      console.log(data);
      this.toastr.success("Mensagem", "item removido");
          this.getItemCart(this.id_usuario);

    })

}

cad(){
  console.log(this.cadastro.value);
  this.eburger.cad_user_eburger(this.cadastro.value).subscribe((data:any)=>{
    console.log('cadastro feito', data);
    this.toastr.success("Mensagem", data.message);
    this.cadastro.reset();
  })
}
}
