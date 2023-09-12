import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController desde Ionic


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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

    registrar() {
      if (this.username && this.password) {

        const userData = {
          username: this.username,
          password: this.password,
        };

        this.usuariosLista.push(userData);
        localStorage.setItem('users', JSON.stringify(this.usuariosLista));

        console.log('Usuarios antes de agregar:', this.usuariosLista);

        this.username = '';
        this.password = '';
        location.reload();
      } else{
        console.log('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        this.mostrarMensajeError();
      }
    }

}
