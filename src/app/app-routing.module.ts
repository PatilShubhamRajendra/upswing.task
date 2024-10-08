import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './master/product/product.component';

const routes: Routes = [
  {
    path: '', component: ProductComponent,
  },
  {
    path: 'product', component: ProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
