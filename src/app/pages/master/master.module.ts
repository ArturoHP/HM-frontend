import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from 'src/app/modules/material/material.module';


@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [
    MasterRoutingModule,
    DragDropModule,
    CommonModule,
    MaterialModule
  ]
})
export class MasterModule { }
