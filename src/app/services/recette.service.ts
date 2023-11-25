import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recette } from '../models/recette.models';
import {Etape} from "../models/etape.models";

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

   constructor(private http:HttpClient) { }


  public getRecettes1(): Observable<Recette[]> {
    return this.http.get<Recette[]>(environment.backendHost + "/recettes");
  }
  public getRecettess(): Observable<Recette[]> {
    return this.http.get<Recette[]>(environment.backendHost + "/recettes/all");
  }

  public saveRecette(Recette: Recette, etapeId: number): Observable<Recette> {
    // Include etapeId as a query parameter in the request
    return this.http.post<Recette>(
      `${environment.backendHost}/recettes?etapeId=${etapeId}`,
      Recette
    );
  }

  public updateRecette(id: number,Recette: Recette, etapeId: number):Observable<Recette>{
    return this.http.put<Recette>(`${environment.backendHost}/recettes/${id}?etapeId=${etapeId}`,Recette);
  }
  public getRecette(id: number):Observable<Recette>{
    return this.http.get<Recette>(environment.backendHost+"/recettes/"+id);
  }
  public deleteRecette(id: number): Observable<any>{
    return this.http.delete(environment.backendHost+"/recettes/"+id);
  }
  public getRecettesByEtape(etapeId: number): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${environment.backendHost}/recettes/filere/${etapeId}`);
  }
  public getSemesterByEtape(etapeId: number): Observable<Etape[]> {
    return this.http.get<Etape[]>(`${environment.backendHost}/recettes/filere/${etapeId}`);
  }
}

