import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.models';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import {IngredientService} from "../../../services/ingredient.service";




@Component({
  selector: 'app-add-new-ingredient',
  templateUrl: './add-new-ingredient.component.html',
  styleUrls: ['./add-new-ingredient.component.css']
})
export class AddNewIngredientComponent {
  newIngredientFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,private dpService:IngredientService,
    private router: Router) {}

  ngOnInit(): void {
    this.newIngredientFormGroup = this.fb.group({
      libelle: this.fb.control(null, [Validators.required]),

    });
  }

  handleAddDepartement() {
    if (this.newIngredientFormGroup.valid) {
    const newIngredient: Ingredient = this.newIngredientFormGroup.value;
    this.dpService.saveIngredient(newIngredient).subscribe({
      next: data => {
        Swal.fire('Succès', 'Ingredient ajouté avec succès', 'success');
        this.router.navigateByUrl('/ingredients');
      },
      error: err => {
        console.log(err);
      }
    });
  } else {
    Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
  }
  }




  downloadXSL() {
    const xslFilePath = 'assets/DataCSV/Ingredients.xlsx';
    fetch(xslFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Ingredients.xlsx'; // Update with the desired filename
        a.click();
        window.URL.revokeObjectURL(url);
        // Show a SweetAlert2 success message after the download is complete
        Swal.fire({
          icon: 'success',
          title: 'Download Complete',
          text: 'Your XSL file has been downloaded successfully!',
        });
      });
  }

}
