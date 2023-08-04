import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProyectoService, Proyecto } from '../proyecto/proyecto.service';
import { RecursoService, Recurso } from '../recurso/recurso.service';
import { NotificacionService, Notificacion } from '../notificacion/notificacion.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
//  proyectoSeleccionado: Proyecto | null = null;
  notificaciones: Notificacion[] = [];
  porcentajesAvance: number[] = [];
  fechasProyecto: Date[] = [];

  tiempoDedicadoPorRecurso: { recurso: string; tiempo: number }[] = [];
  avancePorProyecto: { proyecto: string; avance: number; tiempo: number }[] = [];

  @ViewChild('grafica', { static: true }) graficaRef!: ElementRef;
  grafica!: Chart;

  // Variables para el formulario de notificación
  recursos: Recurso[] = [];
  proyectos: Proyecto[] = [];
  proyectoSeleccionado: string;
  recursoSeleccionado: string;
  tiempoDedicadoNotif: number;
  fechaNotif: Date = new Date();
  porcentajeAvanceNotif: number;

  constructor(
    private proyectoService: ProyectoService,
    private notificacionService: NotificacionService,
    private recursoService: RecursoService,
    private route: ActivatedRoute
  ) {
    // Código para la gráfica (se mantiene igual)
    // ...

    // Inicialización de variables del formulario de notificación
    this.proyectoSeleccionado = '';
    this.recursoSeleccionado = '';
    this.tiempoDedicadoNotif = 0;
    this.fechaNotif = new Date();
    this.porcentajeAvanceNotif = 0;
  }

  ngOnInit(): void {
    // Carga de proyecto y notificaciones
    // ...

    // Cargar recursos para el formulario de notificación
    this.cargarRecursos();
  }

  cargarRecursos(): void {
    this.recursoService.getAllRecursos().then((recursos) => {
      this.recursos = recursos;
    });
  }

  notificar(): void {
    // Crear objeto de notificación con los datos del formulario
    const nuevaNotificacion: Notificacion = {
      recurso: this.recursoSeleccionado,
      proyecto: this.proyectoSeleccionado,
      tiempoDedicado: this.tiempoDedicadoNotif,
      fecha: this.fechaNotif,
      porcentajeAvance: this.porcentajeAvanceNotif
    };

    // Agregar la notificación al servicio de notificaciones
    this.notificacionService.agregarNotificacion(nuevaNotificacion);

    // Actualizar las notificaciones y los datos para la gráfica
    this.cargarNotificaciones();
  }

  cargarNotificaciones(): void {
    // Carga de notificaciones
    // ...

    // Cálculo de tiempo dedicado por recurso y avance por proyecto
    // ...

    // Actualizar la gráfica y las tablas con los nuevos datos
    this.actualizarGrafica();
    this.actualizarTablaTiempoDedicado();
    this.actualizarTablaComparacionAvances();
  }

  actualizarGrafica(): void {
    // Obtener los nuevos datos de las notificaciones
    this.porcentajesAvance = this.notificaciones.map((notificacion) => notificacion.porcentajeAvance);
    this.fechasProyecto = this.notificaciones.map((notificacion) => new Date(notificacion.fecha));
  
    // Actualizar los datos en el objeto de la gráfica
    this.grafica.data.labels = this.fechasProyecto;
    this.grafica.data.datasets[0].data = this.porcentajesAvance;
  
    // Llamar al método update() para que se reflejen los cambios en la gráfica
    this.grafica.update();
  }
  


  actualizarTablaTiempoDedicado(): void {
    // Reiniciar el arreglo de tiempoDedicadoPorRecurso
    this.tiempoDedicadoPorRecurso = [];
  
    // Obtener un conjunto de recursos únicos de las notificaciones
    const recursosUnicos = Array.from(new Set(this.notificaciones.map((notif) => notif.recurso)));
  
    // Calcular el tiempo dedicado por cada recurso
    for (const recurso of recursosUnicos) {
      const tiempoTotalDedicado = this.notificaciones
        .filter((notif) => notif.recurso === recurso)
        .reduce((total, notif) => total + notif.tiempoDedicado, 0);
  
      this.tiempoDedicadoPorRecurso.push({ recurso, tiempo: tiempoTotalDedicado });
    }
  }
  
  actualizarTablaComparacionAvances(): void {
    // Reiniciar el arreglo de avancePorProyecto
    this.avancePorProyecto = [];
  
    // Obtener un conjunto de proyectos únicos de las notificaciones
    const proyectosUnicos = Array.from(new Set(this.notificaciones.map((notif) => notif.proyecto)));
  
    // Calcular el avance y el tiempo dedicado por proyecto
    for (const proyecto of proyectosUnicos) {
      const notificacionesProyecto = this.notificaciones.filter((notif) => notif.proyecto === proyecto);
      const avanceTotal = notificacionesProyecto.reduce((total, notif) => total + notif.porcentajeAvance, 0);
      const tiempoTotalDedicado = notificacionesProyecto.reduce((total, notif) => total + notif.tiempoDedicado, 0);
  
      this.avancePorProyecto.push({ proyecto, avance: avanceTotal, tiempo: tiempoTotalDedicado });
    }
  }
  
}
