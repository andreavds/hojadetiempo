import { Component } from '@angular/core';
import { Notificacion, NotificacionService } from './notificacion.service';
import { ProyectoService, Proyecto } from '../proyecto/proyecto.service';
import { RecursoService, Recurso } from '../recurso/recurso.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})


export class NotificacionComponent {
  recursos: Recurso[] = [];
  proyectos: Proyecto[] = [];
  recursoSeleccionado = '';
  proyectoSeleccionado = '';
  tiempoDedicado = 0;
  fecha = '';
  porcentajeAvance = 0;

  constructor(
    private notificacionService: NotificacionService,
    private recursoService: RecursoService,
    private proyectoService: ProyectoService
  ) {
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
    const notificacion: Notificacion = {
      proyectoCodigo: this.proyectoSeleccionado,
      recursoCodigo: this.recursoSeleccionado,
      tiempoDedicado: this.tiempoDedicado,
      fecha: this.fecha,
      porcentajeAvance: this.porcentajeAvance,
      valor: undefined,
      recurso: '',
    };

    console.log(notificacion);
    
    this.notificacionService
      .agregarNotificacion(notificacion)
      .then(() => {
        alert('Notificación enviada con éxito.');
        // Aquí podrías mostrar una notificación de éxito o redirigir a otra página
      })
      .catch((error) => {
        // Manejo de errores al agregar la notificación
        console.error('Error al agregar notificación:', error);
      });
  }
}
