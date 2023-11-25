import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.models';
import { IngredientService } from 'src/app/services/ingredient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-ingredients',
  templateUrl: './gestion-ingredient.component.html',
  styleUrls: ['./gestion-ingredient.component.css']
})
export class GestionIngredientComponent implements OnInit {
  ingredients: Ingredient[] = [];
  errorMessage: string = '';
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalElements: number = 0;
  displayedPages: number[] = [];

  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.loadIngredients();

  }

  loadIngredients() {
    this.ingredientService.getAllIngredients().subscribe(
      (response) => {
        this.ingredients = response;
        console.log("reeeeeees"+this.ingredients)
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des ingrédients';
      }
    );
  }

  handleEditIngredient(ingredient: Ingredient) {
    this.router.navigateByUrl('/ingredients/edit', { state: ingredient });
  }

  handleDeleteIngredient(ingredient: Ingredient) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not retrieve this data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ingredientService.deleteIngredient(ingredient.id).subscribe();;
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      }
    });
  }

  handleChangeSize(event: Event) {
    this.size = parseInt((event.target as HTMLInputElement).value);
  }


  setDisplayedPages() {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (let i = startPage; i < startPage + 3 && i < this.totalPages; i++) {
      this.displayedPages.push(i);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.page = page;
  }

  goToPreviousSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage;
    }
  }

  goToNextSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
    }
  }
}
