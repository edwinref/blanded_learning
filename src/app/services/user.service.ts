import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";

import {Recette} from "../models/recette.models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  public saveUser1(etud: {
    recetteId: number;
    password: string;
    tel: string;
    cne: string;
    login: string;
    nom: string;
    prenom: string;
    email: string;
    civilite: string
  }, recetteId: number):Observable<User>{
    return this.http.post<User>(`${environment.backendHost}/user?recetteId=${recetteId}`, etud);
  }
  public saveUser(etud:User, recetteId: number):Observable<User>{
    return this.http.post<User>(`${environment.backendHost}/user?recetteId=${recetteId}`, etud);
  }
  public searchEtud(id : any):Observable<User[]>{
    return this.http.get<User[]>(environment.backendHost+"/user/"+id)
  }

  public getById(id : number):Observable<User>{
    return this.http.get<User>(environment.backendHost+"/user/etud/"+id)
  }

  deleteEud(id: number) {
    return this.http.delete(environment.backendHost+"/user/"+id);
  }
}
