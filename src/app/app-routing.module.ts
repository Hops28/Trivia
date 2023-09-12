import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path : '', component : HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
