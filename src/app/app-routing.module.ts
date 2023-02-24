import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixtureComponent } from './components/fixture/fixture.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },{
    path:'jornadas',
    component:FixtureComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
