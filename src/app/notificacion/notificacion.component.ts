/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent {

}

*/

import { Component, OnInit } from '@angular/core';
import { RecursoService, Recurso } from '../recurso/recurso.service';
import { ProyectoService, Proyecto } from '../proyecto/proyecto.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  recursos: Recurso[] = [];
  proyectos: Proyecto[] = [];
  recursoSeleccionado: string;
  proyectoSeleccionado: string;
  tiempoDedicado: number;
  fecha: Date = new Date();
  porcentajeAvance: number;

  constructor(
    private recursoService: RecursoService,
    private proyectoService: ProyectoService
  ) {
    this.recursoSeleccionado = '';
    this.proyectoSeleccionado = '';
    this.tiempoDedicado = 0;
    this.fecha = new Date();
    this.porcentajeAvance = 0;
  }

  ngOnInit(): void {
    this.cargarRecursos();
    this.cargarProyectos();
  }

  cargarRecursos(): void {
    this.recursoService.getAllRecursos().then((recursos) => {
      this.recursos = recursos;
    });
  }

  cargarProyectos(): void {
    this.proyectoService.getAllProyectos().then((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  notificar(): void {
    // Aquí puedes enviar los datos del formulario al componente de "reporte" o realizar la acción deseada
    // Puedes utilizar un servicio o emitir un evento para pasar los datos.
  }
}
