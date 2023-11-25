import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Etape } from '../../../models/etape.models';
import * as XLSX from 'xlsx';
import {EtapeService} from "../../../services/etape.service";

interface EtapeCSV {
  libelle: string;
  nombreSem: number;
  chefEtape: string;
  departement: string;
}
@Component({
  selector: 'app-add-new-etape',
  templateUrl: './add-new-etape.component.html',
  styleUrls: ['./add-new-etape.component.css'],
})
export class AddNewEtapeComponent implements OnInit {
  newEtapeFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private etapeService: EtapeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newEtapeFormGroup = this.fb.group({
      libelle: this.fb.control(null, [Validators.required]),

    });
  }



  handleAddEtape() {
    if (this.newEtapeFormGroup.valid) {
      const newEtape: Etape = this.newEtapeFormGroup.value;
      this.etapeService.saveEtape(newEtape).subscribe({
        next: () => {
          Swal.fire('Succès', 'Filière ajoutée avec succès', 'success');
          this.router.navigateByUrl('/etapes');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      Swal.fire(
        'Erreur',
        'Veuillez remplir correctement tous les champs du formulaire',
        'error'
      );
    }
  }



  addEtapeFromXLSX(etape: EtapeCSV) {
    if (etape.libelle && etape.departement) {
      const newEtape: { chefEtape: string; nombreSem: number; departement: string; libelle: string } = {
        libelle: etape.libelle,
        nombreSem: etape.nombreSem,
        chefEtape: etape.chefEtape,
        departement: etape.departement
      };

      this.etapeService.saveEtape1(newEtape).subscribe({
        next: data => {
          console.log('Etape ajoutée avec succès:', newEtape);
          Swal.fire('Success', 'Etape ajoutée avec succès', 'success');
        },
        error: err => {
          // Check the error response to determine if it's a successful addition or a real error
          if (err.status === 201) {
            console.log('Etape ajoutée avec succès:', newEtape);
            // Display a success message here if needed
          } else {
            // Utilize Swal.fire to display an error message
            Swal.fire('Erreur', 'Erreur lors de l\'ajout de la Etape', 'error');
            console.error('Erreur lors de l\'ajout de la Etape:', err);
          }
        }
      });
    } else {
      // Utilize Swal.fire to display an error message
      Swal.fire('Erreur', 'Libellé et département sont requis pour ajouter une Filière', 'error');
      console.error('Libellé and département are required in the XLSX data');
    }
  }


}
