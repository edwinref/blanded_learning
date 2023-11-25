import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Ingredient} from "../models/ingredient.models";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  constructor(private http: HttpClient) { }



  public saveIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(environment.backendHost + "/ingredients", ingredient);
  }
  public saveIngredient1(ingredient: { bloc: string; capacite: number; numIngredient: number; typeIngredient: string }): Observable<Ingredient> {
    return this.http.post<Ingredient>(environment.backendHost + "/ingredients", ingredient);
  }
  public updateIngredient(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(environment.backendHost + "/ingredients/" + id, ingredient);
  }

  public getIngredient(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(environment.backendHost + "/ingredients/" + id);
  }
  public getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(environment.backendHost + '/ingredients');
  }
   public deleteIngredient(id: number): Observable<any> {
    return this.http.delete(`${environment.backendHost}/ingredients/${id}`);
  }
}
