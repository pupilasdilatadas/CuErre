import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  nombreBienvenido: string="";
  listaUsuarios: any[] = [];

  constructor() { 
    const usuariosStorage = localStorage.getItem('BIENVENIDO');
    if (usuariosStorage) {
      this.listaUsuarios = JSON.parse(usuariosStorage);
    }
  }

  ngOnInit() {

    const nombreUsuarioIngresado = this.listaUsuarios;

    const usuarioEncontrado = this.listaUsuarios.find(
      (user) => user.username === nombreUsuarioIngresado
    );

    this.nombreBienvenido = `${nombreUsuarioIngresado}`;
    console.log(nombreUsuarioIngresado);
  }

  ngOnDestroy() {
    localStorage.removeItem('BIENVENIDO');
  }


}
