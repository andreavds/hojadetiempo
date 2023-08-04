import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionComponent } from './notificacion/notificacion.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hojadetiempo';
  name = 'Skips';
  age = 24;
  rightPlace = "tu duna"
  wrongPlace = "la luna";
  img = 'https://media.tenor.com/ZhM2wKMMnb8AAAAd/go-to-moon-skips.gif';
  btnDisabled = true;


  constructor(private dialog: MatDialog) {}

  openNotificacion(): void {
    this.dialog.open(NotificacionComponent);
  }
}
