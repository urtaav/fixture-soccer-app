import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterTeamComponent } from './components/page/register-team/register-team.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FixtureComponent } from './components/fixture/fixture.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterTeamComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    FixtureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
