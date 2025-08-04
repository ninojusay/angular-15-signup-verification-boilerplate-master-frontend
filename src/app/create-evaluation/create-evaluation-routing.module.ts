import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEvaluationComponent } from './create-evaluation/create-evaluation.component';  // Import the component

const routes: Routes = [
  { path: '', component: CreateEvaluationComponent }  // Add the route for CreateEvaluationComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEvaluationRoutingModule { }
