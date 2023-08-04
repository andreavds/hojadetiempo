/*
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

*/


/* 2DO INTENTO 
import { Injectable } from '@angular/core';

export interface Notificacion {
  id: number;
  proyectoCodigo: string;
  recursoCodigo: string;
  tiempoDedicado: number;
  fecha: Date;
  porcentajeAvance: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificaciones: Notificacion[] = [];

  agregarNotificacion(notificacion: Notificacion): void {
    this.notificaciones.push(notificacion);
  }

  obtenerNotificacionesPorProyecto(proyectoCodigo: string): Notificacion[] {
    return this.notificaciones.filter(notificacion => notificacion.proyectoCodigo === proyectoCodigo);
  }

  obtenerRecursosConTiempoTotal(proyectoCodigo: string): { recurso: string; tiempoDedicadoTotal: number }[] {
    const recursosConTiempo: { recurso: string; tiempoDedicadoTotal: number }[] = [];
    const notificacionesProyecto = this.obtenerNotificacionesPorProyecto(proyectoCodigo);

    notificacionesProyecto.forEach(notificacion => {
      const recursoExistente = recursosConTiempo.find(item => item.recurso === notificacion.recursoCodigo);

      if (recursoExistente) {
        recursoExistente.tiempoDedicadoTotal += notificacion.tiempoDedicado;
      } else {
        recursosConTiempo.push({
          recurso: notificacion.recursoCodigo,
          tiempoDedicadoTotal: notificacion.tiempoDedicado
        });
      }
    });

    return recursosConTiempo;
  }
}
*/

import { Injectable } from '@angular/core';

export interface Notificacion {
  recurso: any;
  valor: any;
  id?: number;
  proyectoCodigo: string;
  recursoCodigo: string;
  tiempoDedicado: number;
  fecha: string;
  porcentajeAvance: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private readonly DB_NOMBRE = 'mi_basededatos';
  private readonly OBJETO_TIENDA = 'notificaciones';
  private readonly DB_VERSION = 5;
  private db: IDBDatabase | null = null;

  constructor() {
    this.abrirConexion().then((db) => {
      this.db = db;
    });
  }

  private async inicializarBaseDeDatos(): Promise<void> {
    if (!this.db) {
      return;
    }
    if (!this.db.objectStoreNames.contains(this.OBJETO_TIENDA)) {
      const objectStore = this.db.createObjectStore(this.OBJETO_TIENDA, { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('proyectoCodigo', 'proyectoCodigo', { unique: false });
    }
  }

  async agregarNotificacion(notificacion: Notificacion): Promise<number> {
    if (!this.db) {
      return Promise.reject('Error: Base de datos no disponible.');
    }
    const db = this.db; // Almacenar this.db en una variable local
    const transaccion = db.transaction(this.OBJETO_TIENDA, 'readwrite');
    const tienda = transaccion.objectStore(this.OBJETO_TIENDA);
    const solicitud = tienda.add(notificacion);
    return new Promise<number>((resolve, reject) => {
      solicitud.onsuccess = (evento) => {
        const id = (evento.target as IDBRequest<IDBValidKey>).result;
        resolve(id as number);
      };
      solicitud.onerror = (evento) => {
        reject((evento.target as IDBRequest<IDBValidKey>).error);
      };
    });
  }

  async obtenerNotificacionesPorProyecto(proyectoCodigo: string): Promise<Notificacion[]> {
    if (!this.db) {
      return Promise.reject('Error: Base de datos no disponible.');
    }
    const db = this.db; // Almacenar this.db en una variable local
    return new Promise<Notificacion[]>((resolve) => {
      const transaccion = db.transaction(this.OBJETO_TIENDA, 'readonly');
      const tienda = transaccion.objectStore(this.OBJETO_TIENDA);
      const notificaciones: Notificacion[] = [];

      transaccion.oncomplete = () => {
        resolve(notificaciones);
      };

      const index = tienda.index('proyectoCodigo');
      const solicitud = index.openCursor(IDBKeyRange.only(proyectoCodigo));
      solicitud.onsuccess = (evento) => {
        const cursor = (evento.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          notificaciones.push(cursor.value);
          cursor.continue();
        }
      };
    });
  }

  private async abrirConexion(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const solicitud = indexedDB.open(this.DB_NOMBRE, this.DB_VERSION);

      solicitud.onupgradeneeded = (evento) => {
        const db = (evento.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.OBJETO_TIENDA)) {
          const objectStore = db.createObjectStore(this.OBJETO_TIENDA, { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('proyectoCodigo', 'proyectoCodigo', { unique: false });
        }
      };

      solicitud.onsuccess = (evento) => {
        const db = (evento.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      solicitud.onerror = (evento) => {
        reject((evento.target as IDBOpenDBRequest).error);
      };
    });
  }
}
