import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEvaluationRoutingModule } from './create-evaluation-routing.module';
import { CreateEvaluationComponent } from './create-evaluation/create-evaluation.component';


@NgModule({
  declarations: [
    CreateEvaluationComponent
  ],
  imports: [
    CommonModule,
    CreateEvaluationRoutingModule
  ]
})
export class CreateEvaluationModule { }
