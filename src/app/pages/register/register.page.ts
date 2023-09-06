import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  usuariosLista: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  registrar() {
    // Validar que se hayan ingresado datos en los campos
    if (this.username && this.password) {
      // Crear un objeto con los datos ingresados
      const userData = {
        username: this.username,
        password: this.password,
      };

      // Agregar el objeto a la lista
      this.usuariosLista.push(userData);

      // Guardar la lista en el localStorage
      localStorage.setItem('users', JSON.stringify(this.usuariosLista));

      // Limpiar los campos de entrada
      this.username = '';
      this.password = '';
    }
  }

}
