/*
import { Component, OnInit } from '@angular/core';
import { RecursoService, Recurso } from './recurso.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
/*

/*
export class RecursoComponent {
  recursos: Recurso[] = [];
  codigoRecurso = '';
  nombreRecurso = '';
  nuevoCodigoRecurso = ''; // Variable para mantener el código del nuevo recurso
  mostrarFormulario = false;

  constructor(private recursoService: RecursoService) {
    this.cargarRecursos();
  }

  cargarRecursos(): void {
    this.recursoService.getAllRecursos().then((recursos) => {
      this.recursos = recursos;
    });
  }

  nuevoRecurso(): void {
    this.mostrarFormulario = true;
    this.nuevoCodigoRecurso = this.codigoRecurso; // Guardar el código actual en la variable nueva
    this.codigoRecurso = ''; // Restablecer solo el código, el nombre se mantiene
    this.nombreRecurso = ''; // Restablecer el nombre del recurso
  }

  editarRecurso(codigo: string): void {
    this.codigoRecurso = codigo;
    const recurso = this.recursos.find((r) => r.codigo === codigo);

    if (recurso) {
      this.nombreRecurso = recurso.nombre;
      this.mostrarFormulario = true;
    }
  }

  confirmarAccion(): void {
    if (this.codigoRecurso && this.nombreRecurso) {
      if (this.mostrarFormulario) {
        if (this.recursos.some((recurso) => recurso.codigo === this.codigoRecurso)) {
          this.recursoService
            .actualizarRecurso({ codigo: this.codigoRecurso, nombre: this.nombreRecurso })
            .then(() => {
              this.cargarRecursos();
              this.mostrarFormulario = false;
              this.codigoRecurso = this.nuevoCodigoRecurso; // Restablecer el código del recurso al salir del formulario
            });
        } else {
          // Recurso nuevo, realizar adición
          this.recursoService
            .agregarRecurso({ codigo: this.codigoRecurso, nombre: this.nombreRecurso })
            .then(() => {
              this.cargarRecursos();
              this.mostrarFormulario = false;
              this.codigoRecurso = this.nuevoCodigoRecurso; // Restablecer el código del recurso al salir del formulario
            });
        }
      }
    }
  }

  eliminarRecurso(codigo: string): void {
    this.recursoService.eliminarRecurso(codigo).then(() => {
      this.cargarRecursos();
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { RecursoService, Recurso } from './recurso.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})

*/

//2DO INTENTO

/*
export class RecursoComponent implements OnInit {
  recursos: Recurso[] = [];
  codigoRecurso = '';
  nombreRecurso = '';
  nuevoCodigoRecurso = ''; // Variable para mantener el código del nuevo recurso
  mostrarFormulario = false;

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.cargarRecursos();
  }

  cargarRecursos(): void {
    this.recursoService.getAllRecursos().then((recursos) => {
      this.recursos = recursos;
    });
  }

  nuevoRecurso(): void {
    this.mostrarFormulario = true;
    this.nuevoCodigoRecurso = this.codigoRecurso; // Guardar el código actual en la variable nueva
    this.codigoRecurso = ''; // Restablecer solo el código, el nombre se mantiene
    this.nombreRecurso = ''; // Restablecer el nombre del recurso
  }

  editarRecurso(codigo: string): void {
    this.codigoRecurso = codigo;
    const recurso = this.recursos.find((r) => r.codigo === codigo);

    if (recurso) {
      this.nombreRecurso = recurso.nombre;
      this.mostrarFormulario = true;
    }
  }

  confirmarAccion(): void {
    if (this.codigoRecurso && this.nombreRecurso) {
      if (this.mostrarFormulario) {
        if (this.recursos.some((recurso) => recurso.codigo === this.codigoRecurso)) {
          this.recursoService
            .actualizarRecurso({ codigo: this.codigoRecurso, nombre: this.nombreRecurso })
            .then(() => {
              this.cargarRecursos();
              this.mostrarFormulario = false;
              this.codigoRecurso = this.nuevoCodigoRecurso; // Restablecer el código del recurso al salir del formulario
            });
        } else {
          // Recurso nuevo, realizar adición
          this.recursoService
            .agregarRecurso({ codigo: this.codigoRecurso, nombre: this.nombreRecurso })
            .then(() => {
              this.cargarRecursos();
              this.mostrarFormulario = false;
              this.codigoRecurso = this.nuevoCodigoRecurso; // Restablecer el código del recurso al salir del formulario
            });
        }
      }
    }
  }

  eliminarRecurso(codigo: string): void {
    this.recursoService.eliminarRecurso(codigo).then(() => {
      this.cargarRecursos();
    });
  }
}

*/


// TERCER INTENTO

import { Component } from '@angular/core';
import { RecursoService, Recurso } from './recurso.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent {
  recursos: Recurso[] = [];
  codigoRecurso = '';
  nombreRecurso = '';
  mostrarFormulario = false;

  constructor(private recursoService: RecursoService) {
    this.cargarRecursos();
  }

  cargarRecursos(): void {
    this.recursoService.getAllRecursos().then((recursos) => {
      this.recursos = recursos;
    });
  }

  nuevoRecurso(): void {
    this.mostrarFormulario = true;
    this.nombreRecurso = '';

    if (Number(this.codigoRecurso) <= 0 || isNaN(Number(this.codigoRecurso)) || this.recursos.some((recurso) => recurso.codigo === this.codigoRecurso)) {
      alert('Inserta un código válido');
      this.mostrarFormulario = false;
      return;
    }
  }

  editarRecurso(codigo: string): void {
    this.codigoRecurso = codigo;
    const recurso = this.recursos.find((recurso) => recurso.codigo === codigo);

    if (recurso) {
      this.nombreRecurso = recurso.nombre;
      this.mostrarFormulario = true;
    }
  }

  confirmarAccion(): void {
    if (this.codigoRecurso && this.nombreRecurso) {
      if (this.mostrarFormulario) {
        if (this.recursos.some((recurso) => recurso.codigo === this.codigoRecurso)) {
          this.recursoService
            .actualizarRecurso({ codigo: this.codigoRecurso, nombre: this.nombreRecurso })
            .then(() => {
              this.cargarRecursos();
              this.mostrarFormulario = false;
            });
        } else {
          // Precurso nuevo, realizar adición
          this.recursoService
            .agregarRecurso({ codigo: this.codigoRecurso, nombre: this.nombreRecurso })
            .then(() => {
              this.cargarRecursos();
              this.mostrarFormulario = false;
            });
        }
      }
    }
  }

  eliminarRecurso(codigo: string): void {
    this.recursoService.eliminarRecurso(codigo).then(() => {
      this.cargarRecursos();
    });
  }
}
