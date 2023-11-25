import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Recette } from '../../../models/recette.models';
import { Etape } from '../../../models/etape.models';
import {RecetteService} from "../../../services/recette.service";
import {EtapeService} from "../../../services/etape.service";


@Component({
  selector: 'app-add-new-recette',
  templateUrl: './add-new-recette.component.html',
  styleUrls: ['./add-new-recette.component.css']
})
export class AddNewRecetteComponent implements OnInit {
  newClassFormGroup!: FormGroup;
  etapes: Etape[] = [];
  recette!:Recette;
  @ViewChild('close', { static: true }) close!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private clService: RecetteService,
    private etapeService: EtapeService,
  ) {}

  ngOnInit(): void {
    this.newClassFormGroup = this.fb.group({
        libelle: ['', Validators.required],
        duree: [null, Validators.required],
    });

    this.fetchEtapes();
  }

      fetchEtapes() {
          this.etapeService.getAllEtapes().subscribe(
              (response: any) => {
                  if (response && Array.isArray(response.content)) {
                      const etapes: Etape[] = response.content;
                      this.etapes = etapes;
                      console.log(this.etapes);
                      if (this.etapes.length > 0) {
                          this.newClassFormGroup.patchValue({ etape: this.etapes[0] });
                      }
                  } else {
                      console.error('Unexpected response from the server:', response);
                      // Handle the unexpected response here, such as displaying an error message.
                  }
              },
              (error) => {
                  console.log(error);
                  // Handle the error here, such as displaying an error message.
              }
          );
      }




handleAddRecette() {
    if (this.newClassFormGroup.valid) {
      const newRecette: Recette = this.newClassFormGroup.value;
      this.recette = this.newClassFormGroup.value;

      // Find the selected filière object based on the selected ID
      const selectedEtapeId: number = +newRecette.etapes; // Use a type assertion if necessary

      const selectedEtape = this.etapes.find(etape => etape.id === selectedEtapeId);

      if (selectedEtape) {
        // Update the 'etape' property with the selected filière object
        //newRecette.etapes = selectedEtape;

        console.log('Adding new class:', newRecette);

        // Send the selected etapeId to the backend
        const etapeIdToSend = selectedEtape.id;

        this.clService.saveRecette(newRecette, etapeIdToSend).subscribe(
          (data) => {
            console.log('Response data:', data);
            Swal.fire('Succès', 'Recette ajoutée avec succès', 'success');
            // Reset the form
            this.newClassFormGroup.reset();
          },
          (error) => {
            console.log('Error status:', error.status);
            console.log('Error message:', error.message);
            console.log('Error details:', error.error);

            Swal.fire(
              'Erreur',
              'Erreur lors de l\'ajout de la recette: ' + error.message,
              'error'
            );
          }
        );
      } else {
        Swal.fire(
          'Erreur',
          'La filière sélectionnée est introuvable',
          'error'
        );
      }
    } else {
      Swal.fire(
        'Erreur',
        'Veuillez remplir correctement tous les champs du formulaire',
        'error'
      );
    }
  }





}
