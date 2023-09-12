import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController desde Ionic


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombreAlumno: string = '';
  rutAlumno: string = '';
  username: string = '';
  password: string = '';
  usuariosLista: any[] = [];

  constructor(
    private router: Router, //para navegar entre pages
    private alertController: AlertController
    ) { }

  ngOnInit() {
    
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.usuariosLista = JSON.parse(storedUsers);
    }

  }

  async mostrarMensajeError() { //await solo se permite en funciones async
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'If you got questions or you need advice, then talk to God Cause Hes the only one that listens even when you think He isnt',
      buttons: ['Aceptar']
    });

    
  
    await alert.present();
  }

  async mostrarMensajeUsuario() { //await solo se permite en funciones async
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El nombre de usuario ya existe. Por favor, elige otro!',
      buttons: ['Aceptar']
    });

    
  
    await alert.present();
  }

  registrar() {
    if (this.username && this.password) {
      const usuarioExistente = this.usuariosLista.some(
        (user) => user.username === this.username
      );
  
      if (usuarioExistente) {
        console.log('El nombre de usuario ya existe. Por favor, elige otro!');
        this.mostrarMensajeUsuario();
      } else {

        const userData = {
          nombre: this.nombreAlumno,
          rut: this.rutAlumno,
          username: this.username,
          password: this.password,
        };
  
        this.usuariosLista.push(userData);
        localStorage.setItem('users', JSON.stringify(this.usuariosLista));
  
        console.log('Usuarios después de agregar:', this.usuariosLista);

        this.nombreAlumno = '';
        this.rutAlumno = '';
        this.username = '';
        this.password = '';
        location.reload();
      }
    } else {
      console.log('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      this.mostrarMensajeError();
    }
  }
  

}
