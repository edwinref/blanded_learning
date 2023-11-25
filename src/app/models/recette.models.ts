import {Ingredient} from "./ingredient.models";
import {Etape} from "./etape.models";

export interface Recette {
  newRecette: Etape;
  id: number;
  libelle: string;
  ingredients: Ingredient[];
  etapes: Etape[];
  dureePreparation: number;
}
