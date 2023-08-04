import { Component, OnInit } from '@angular/core';
import { ProyectoService, Proyecto } from '../proyecto/proyecto.service';
import { Notificacion, NotificacionService } from '../notificacion/notificacion.service';
import { Chart, ChartConfiguration, ChartDataset, ChartOptions, TimeScale } from 'chart.js';

// Interfaz para representar la información del recurso con el tiempo dedicado total
interface RecursoConTiempo {
  recurso: string;
  tiempoDedicadoTotal: number;
  
}


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})

export class ReporteComponent implements OnInit {
  proyectos: Proyecto[] = [];
  proyectoSeleccionado = '';
  recursosConTiempo: RecursoConTiempo[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private notificacionService: NotificacionService
  ) {
    this.cargarProyectos();
  }

  ngOnInit() {
    // Cargar proyectos al inicio del componente
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.getAllProyectos().then((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  generarReporte(): void {
    // Obtener el proyecto seleccionado
    const proyectoSeleccionado = this.proyectoSeleccionado;

    // Obtener las notificaciones para el proyecto seleccionado
    this.notificacionService
      .obtenerNotificacionesPorProyecto(proyectoSeleccionado)
      .then((notificaciones) => {
        // Aquí tienes las notificaciones para el proyecto seleccionado
        // Puedes usarlas para generar el gráfico y calcular el tiempo acumulado
        this.crearGrafico(notificaciones);
        this.calcularTiempoAcumulado(notificaciones);
      })
      .catch((error) => {
        console.error('Error al obtener notificaciones:', error);
      });
  }

  crearGrafico(notificaciones: Notificacion[]) {
    // Implementa aquí el código necesario para crear el gráfico
    // O puedes dejarlo vacío si ya tienes esa funcionalidad implementada
  }

  calcularTiempoAcumulado(notificaciones: Notificacion[]) {
    // Calcular el tiempo acumulado para cada recurso
    const recursosMap: { [recurso: string]: number } = {};
    notificaciones.forEach((notificacion: Notificacion) => {
      if (recursosMap.hasOwnProperty(notificacion.recursoCodigo)) {
        recursosMap[notificacion.recursoCodigo] += notificacion.tiempoDedicado;
      } else {
        recursosMap[notificacion.recursoCodigo] = notificacion.tiempoDedicado;
      }
    });

    // Actualizar la variable recursosConTiempo con los datos calculados
    this.recursosConTiempo = Object.keys(recursosMap).map((recurso) => ({
      recurso: recurso,
      tiempoDedicadoTotal: recursosMap[recurso],
    }));
  }

}