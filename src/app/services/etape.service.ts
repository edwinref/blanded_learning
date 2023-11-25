import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etape } from '../models/etape.models';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {

   constructor(private http:HttpClient) { }
  public getAllEtapes(): Observable<Etape[]> {
    return this.http.get<Etape[]>(`${environment.backendHost}/etapes`);
  }

  public saveEtape(Etape: Etape):Observable<Etape>{
    return this.http.post<Etape>(environment.backendHost+"/etapes",Etape);
  }
  public saveEtape1(Etape: {
    chefEtape: string;
    nombreSem: number;
    departement: string;
    libelle: string
  }):Observable<Etape>{
    return this.http.post<Etape>(environment.backendHost+"/etapes",Etape);
  }
  public updateEtape(id: number,Etape: Etape):Observable<Etape>{
     console.log("Update f");
    return this.http.put<Etape>(environment.backendHost+"/etapes/"+id,Etape);
  }
  public getEtape(id: number):Observable<Etape>{
    return this.http.get<Etape>(environment.backendHost+"/etapes/"+id);
  }
  public deleteEtape(id: number): Observable<any>{
    return this.http.delete(environment.backendHost+"/etapes/"+id);
  }
  public getSemsterByEtape(id: number):Observable<any>{
    return this.http.get(environment.backendHost+"/etapes/"+id+"/semesters");
  }
}
