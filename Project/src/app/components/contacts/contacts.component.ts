import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  private adress:string = 'st. akad.Boris Stefanov 7, on the right side  of "Jumaqta"';
  private hours:string='10-19 every day';
  private number:string='0836472812';
  private email:string='bestphones@gmail.com'
  constructor() { }

  ngOnInit() {
  }
  

}
