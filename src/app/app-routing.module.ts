import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeRootComponent } from './tree/tree-root/tree-component.component';


const routes: Routes = [
  {
    path :'',
    redirectTo:'tree',
    pathMatch: 'full'
  },
  {
    path : 'tree',
    component : TreeRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
