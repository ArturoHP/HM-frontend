import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MaterialModule } from '../../modules/material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    DashboardRoutingModule,
    DragDropModule,
    CommonModule,
    MaterialModule
  ]
})
export class DashboardModule { }
