import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogListComponent } from './components/dog-list/dog-list.component';
import { LikesPageComponent } from './components/like-page/like-page.component';

const routes: Routes = [
  { path: '', component: DogListComponent },
  { path: 'votes', component: LikesPageComponent},
  { path: '**', redirectTo: '' } // redirect to homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
