import { Injectable } from '@angular/core';

export interface Notificacion {
  recurso: string;
  proyecto: string;
  tiempoDedicado: number;
  fecha: Date;
  porcentajeAvance: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificaciones: Notificacion[] = [];

  constructor() {}

  getAllNotificaciones(): Notificacion[] {
    return this.notificaciones;
  }

  getNotificacionesByProyecto(proyectoCodigo: string): Notificacion[] {
    return this.notificaciones.filter((notificacion) => notificacion.proyecto === proyectoCodigo);
  }

  agregarNotificacion(notificacion: Notificacion): void {
    this.notificaciones.push(notificacion);
  }
}
