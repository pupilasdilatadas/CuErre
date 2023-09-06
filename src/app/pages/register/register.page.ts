import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  token = 'hola123asupont123'

  constructor() { }

  ngOnInit() {
  }

  registrar(){
    localStorage.setItem('token',this.token)
  }

}
