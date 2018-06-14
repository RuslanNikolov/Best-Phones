import { Component }  from "@angular/core";

@Component({
  templateUrl: './home.components.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent { 
  public username : string;

  constructor() {
    this.username = localStorage.getItem('username');
  }
}