import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home-page/home-page.module#HomePageModule'
  },
  {
    path: 'planner',
    loadChildren: './modules/planner/planner.module#PlannerModule'
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
