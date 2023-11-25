import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { GestionEtapeComponent } from './components/gestion/gestion-etape/gestion-etape.component';
import { AddNewEtapeComponent } from './components/add/add-new-etape/add-new-etape.component';
import { GestionRecetteComponent } from './components/gestion/gestion-recette/gestion-recette.component';
import { AddNewRecetteComponent } from './components/add/add-new-recette/add-new-recette.component';
import { GestionIngredientComponent } from './components/gestion/gestion-ingredient/gestion-ingredient.component';
import { AddNewIngredientComponent } from './components/add/add-new-ingredient/add-new-ingredient.component';
import { NotFoundComponent } from './components/widgets/not-found/not-found.component';

import { IndexPageComponent } from './components/index-page/index-page.component';

import {AddNewUserComponent} from "./components/add/add-new-user/add-new-user.component";
import {GestionUserComponent} from "./components/gestion/gestion-user/gestion-user.component";


const routes: Routes = [
  { path :'' , component: HomeComponent},
  { path :'index' , component: IndexPageComponent},
    { path :'home' , component: HomeComponent},

    { path :'etapes' , component: GestionEtapeComponent},
    { path :'etapes/add' , component: AddNewEtapeComponent},
    { path :'recettes' , component: GestionRecetteComponent},
    { path :'recettes/add' , component: AddNewRecetteComponent},
    { path :'ingredients' , component: GestionIngredientComponent},
    { path :'ingredients/add' , component: AddNewIngredientComponent},
  { path :'user' , component: GestionUserComponent},
  { path :'user/add' , component: AddNewUserComponent},


  // not-found
    { path :'**' , component: NotFoundComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
