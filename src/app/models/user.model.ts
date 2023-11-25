import {Recette} from "./recette.models";

export interface User {
  id:         number;
  civilite: string;
  nom:        string;
  prenom:     string;
  cne:        string;
  email:      string;
  login:      string;
  password:   string;
  tel: string;


}
