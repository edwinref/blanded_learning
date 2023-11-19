import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/dashboard/app.component';
import { SidebarComponent } from './components/widgets/sidebar/sidebar.component';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { FooterComponent } from './components/widgets/footer/footer.component';
import { BackgroundComponent } from './components/widgets/background/background.component';

import { PageHeaderComponent } from './components/widgets/page-header/page-header.component';
import { StatistiqueComponent } from './components/widgets/statistique/statistique.component';
import { AddNewProfComponent } from './components/add/add-new-prof/add-new-prof.component';
import { GestionProfComponent } from './components/gestion/gestion-prof/gestion-prof.component';
import { HomeComponent } from './components/home/home.component';
import { GestionFiliereComponent } from './components/gestion/gestion-filiere/gestion-filiere.component';
import { AddNewFiliereComponent } from './components/add/add-new-filiere/add-new-filiere.component';
import { AddNewDepartementComponent } from './components/add/add-new-departement/add-new-departement.component';
import { GestionClasseComponent } from './components/gestion/gestion-classe/gestion-classe.component';
import { AddNewClasseComponent } from './components/add/add-new-classe/add-new-classe.component';
import { GestionSallesComponent } from './components/gestion/gestion-salles/gestion-salles.component';
import { AddNewSalleComponent } from './components/add/add-new-salle/add-new-salle.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimetableComponent } from './components/timetable/timetable.component';
import { EditProfComponent } from './components/edit/edit-prof/edit-prof.component';
import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionDepartmentComponent } from './components/gestion/gestion-departement/gestion-departement.component';
import { EditDepartementComponent } from './components/edit/edit-departement/edit-departement.component';
import { EditSalleComponent } from './components/edit/edit-salle/edit-salle.component';
import { ActionsComponent } from './components/dashboard/actions/actions.component';
import { EditFiliereComponent } from './components/edit/edit-filiere/edit-filiere.component';
import { EditClasseComponent } from './components/edit/edit-classe/edit-classe.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { LoginComponent } from './components/widgets/login/login.component';
import { ProfileComponent } from './components/widgets/profile/profile.component';
import { EditProfileComponent } from './components/edit/edit-profile/edit-profile.component';
import { NonDisponibleComponent } from './components/gestion/non-disponible/non-disponible.component';
import {AddNewModuleComponent} from "./components/add/add-new-coursmodel/add-new-coursmodel.component";

import {AddNewEtudiantComponent} from "./components/add/add-new-etudiant/add-new-etudiant.component";
import {GestionEtudiantComponent} from "./components/gestion/gestion-etudiant/gestion-etudiant.component";
import {GestionModuleComponent} from "./components/gestion/gestion-coursmodules/gestion-coursmodules.component";
import {EditModuleComponent} from "./components/edit/edit-coursmodule/edit-coursmodules.component";
import { EditEtudComponent } from './components/edit/edit-etud/edit-etud.component';
import { GestionCriteriaComponent } from './components/gestion/gestion-criteria/gestion-criteria.component';
import { AddCriteriaComponent } from './components/add/add-criteria/add-criteria.component';
import { GestionGroupsComponent } from './components/gestion/gestion-groups/gestion-groups.component';
import { EditGroupsComponent } from './components/edit/edit-groups/edit-groups.component';
import { AddGroupComponent } from './components/add/add-group/add-group.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PageHeaderComponent,
    StatistiqueComponent,
    ActionsComponent,
    AddNewProfComponent,
    GestionProfComponent,
    HomeComponent,
    GestionFiliereComponent,
    AddNewFiliereComponent,
    AddNewDepartementComponent,
    GestionClasseComponent,
    AddNewClasseComponent,
    GestionDepartmentComponent,
    GestionSallesComponent,
    AddNewSalleComponent,
    TimetableComponent,
    EditProfComponent,
    NotFoundComponent,
    EditDepartementComponent,
    EditSalleComponent,
    ActionsComponent,
    EditFiliereComponent,
    EditClasseComponent,
    IndexPageComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    NonDisponibleComponent,
    AddNewModuleComponent,
    GestionModuleComponent,
    EditModuleComponent,
    AddNewEtudiantComponent,
    GestionEtudiantComponent,
    EditEtudComponent,
    GestionCriteriaComponent,
    AddCriteriaComponent,
    BackgroundComponent,
    GestionGroupsComponent,
    EditGroupsComponent,
    AddGroupComponent
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
