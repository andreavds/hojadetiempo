import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { RecursoComponent } from './recurso/recurso.component';
import { ReporteComponent } from './reporte/reporte.component';
import { NotificacionService } from './notificacion/notificacion.service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotificacionComponent,
    ProyectoComponent,
    RecursoComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule, 
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  exports: [
    MatButtonModule,
    MatDialogModule
  ],
  providers: [NotificacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MaterialModule { }
export class ProyectoModule { }