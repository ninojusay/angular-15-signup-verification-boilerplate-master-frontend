import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
// Lazy-loaded modules
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const createEvaluationModule = () => import('./create-evaluation/create-evaluation.module').then(m => m.CreateEvaluationModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    // Dashboard route (with role-based access control)
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.User] } },
      { path: 'create-evaluation', loadChildren: createEvaluationModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
     { path: 'teachers', component: TeacherListComponent },
   
   
      // Catch-all route, redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
