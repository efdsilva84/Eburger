import { Component } from '@angular/core';
import { EburgerService } from '../services/eburger.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  list_txt:any
  list_item:any;
  constructor(private eburger: EburgerService){

  }

  ngOnInit(){
    this.eburger.getEburgers().subscribe((data:any)=>{
      console.log("todos os textos", data);
      this.list_txt = data;
    });

    this.itemsMenu();

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


}
