import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // <-- Import FormsModule for ngModel
import { AdminRoutingModule } from './admin-routing.module';
import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';
import { ListComponent } from './accounts/list.component';  // <-- Declare ListComponent here

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,  // If you're using reactive forms elsewhere
    FormsModule,          // <-- Ensure FormsModule is imported for ngModel support
    AdminRoutingModule    // Import routing module for admin
  ],
  declarations: [
    SubNavComponent,
    LayoutComponent,
    OverviewComponent,
    ListComponent  // <-- Declare ListComponent here
  ]
})
export class AdminModule { }
