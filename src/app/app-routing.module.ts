import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { RecursoComponent } from './recurso/recurso.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'proyecto', component: ProyectoComponent },
  { path: 'notificacion', component: NotificacionComponent },
  { path: 'recurso', component: RecursoComponent },
  { path: 'reporte', component: ReporteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
