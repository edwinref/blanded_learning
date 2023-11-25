import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/dashboard/app.component';
import { SidebarComponent } from './components/widgets/sidebar/sidebar.component';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { FooterComponent } from './components/widgets/footer/footer.component';
import { BackgroundComponent } from './components/widgets/background/background.component';

import { PageHeaderComponent } from './components/widgets/page-header/page-header.component';
import { HomeComponent } from './components/home/home.component';
import { GestionEtapeComponent } from './components/gestion/gestion-etape/gestion-etape.component';
import { AddNewEtapeComponent } from './components/add/add-new-etape/add-new-etape.component';
import { GestionRecetteComponent } from './components/gestion/gestion-recette/gestion-recette.component';
import { AddNewRecetteComponent } from './components/add/add-new-recette/add-new-recette.component';
import { GestionIngredientComponent } from './components/gestion/gestion-ingredient/gestion-ingredient.component';
import { AddNewIngredientComponent } from './components/add/add-new-ingredient/add-new-ingredient.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ActionsComponent } from './components/dashboard/actions/actions.component';

import { IndexPageComponent } from './components/index-page/index-page.component';
import { LoginComponent } from './components/widgets/login/login.component';


import {AddNewUserComponent} from "./components/add/add-new-user/add-new-user.component";
import {GestionUserComponent} from "./components/gestion/gestion-user/gestion-user.component";


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PageHeaderComponent,
    ActionsComponent,
    HomeComponent,
    GestionEtapeComponent,
    AddNewEtapeComponent,
    GestionRecetteComponent,
    AddNewRecetteComponent,
    GestionIngredientComponent,
    AddNewIngredientComponent,
    NotFoundComponent,


    IndexPageComponent,
    LoginComponent,

    AddNewUserComponent,
    GestionUserComponent,

    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
