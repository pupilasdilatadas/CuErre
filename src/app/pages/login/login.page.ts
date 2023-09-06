import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  listaUsuarios: any[] = [];
  listaBienvenidos: any[] = [];
  nombreUsuario: string = '';
  contrasena: string = '';

  bienvenidoTitulo: string = '';

  constructor(


    private router: Router //para navegar entre pages

    
  ) { 
    const usuariosStorage = localStorage.getItem('users');
    if (usuariosStorage) {
      this.listaUsuarios = JSON.parse(usuariosStorage);
    }
  }

  ngOnInit() {
    console.log("users", this.listaUsuarios)
  }

  login() {

    const nombreUsuarioIngresado = this.nombreUsuario;
    const contrasenaIngresada = this.contrasena;

    const usuarioEncontrado = this.listaUsuarios.find(
      (user) => user.username === nombreUsuarioIngresado && user.password === contrasenaIngresada
    );

    if (usuarioEncontrado) {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(["/inicio"]);
      this.listaBienvenidos.push(nombreUsuarioIngresado);
      localStorage.setItem('BIENVENIDO', JSON.stringify(this.listaBienvenidos));
    } else{
      console.log('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
    
  }










}
