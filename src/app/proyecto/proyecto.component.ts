import { Component } from '@angular/core';
import { ProyectoService, Proyecto } from './proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {
  proyectos: Proyecto[] = [];
  codigoProyecto = '';
  descripcionProyecto = '';
  mostrarFormulario = false;

  constructor(private proyectoService: ProyectoService) {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.getAllProyectos().then((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  nuevoProyecto(): void {
    this.mostrarFormulario = true;
    this.descripcionProyecto = '';

    if (Number(this.codigoProyecto) <= 0 || isNaN(Number(this.codigoProyecto)) || this.proyectos.some((proyecto) => proyecto.codigo === this.codigoProyecto)) {
      alert('Inserta un código válido');
      this.mostrarFormulario = false;
      return;
    }
  }

  editarProyecto(codigo: string): void {
    this.codigoProyecto = codigo;
    const proyecto = this.proyectos.find((p) => p.codigo === codigo);

    if (proyecto) {
      this.descripcionProyecto = proyecto.descripcion;
      this.mostrarFormulario = true;
    }
  }

  confirmarAccion(): void {
    if (this.codigoProyecto && this.descripcionProyecto) {
      if (this.mostrarFormulario) {
        if (this.proyectos.some((proyecto) => proyecto.codigo === this.codigoProyecto)) {
          this.proyectoService
            .actualizarProyecto({ codigo: this.codigoProyecto, descripcion: this.descripcionProyecto })
            .then(() => {
              this.cargarProyectos();
              this.mostrarFormulario = false;
            });
        } else {
          // Proyecto nuevo, realizar adición
          this.proyectoService
            .agregarProyecto({ codigo: this.codigoProyecto, descripcion: this.descripcionProyecto })
            .then(() => {
              this.cargarProyectos();
              this.mostrarFormulario = false;
            });
        }
      }
    }
  }

  eliminarProyecto(codigo: string): void {
    this.proyectoService.eliminarProyecto(codigo).then(() => {
      this.cargarProyectos();
    });
  }
}
