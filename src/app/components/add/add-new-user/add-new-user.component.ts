import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {Recette} from "../../../models/recette.models";
import {RecetteService} from "../../../services/recette.service";
import * as XLSX from 'xlsx';

import {error} from "@angular/compiler-cli/src/transformers/util";
import {EtapeService} from "../../../services/etape.service";
import {Etape} from "../../../models/etape.models";
interface CSVData {
  id?: number; // Define the structure of each object

  civilite: string;
  nom:        string;
  prenom:     string;
  cne:        string;
  email:      string;
  login:      string;
  password:   string;
  tel: string;
  recetteId: number;
}


@Component({
  selector: 'app-add-new-prof',
  templateUrl:  './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})



export class AddNewUserComponent {
  newProfFormGroup!: FormGroup;
  recette: Recette[] = [];

  semesters: any[] = [];

  selectedRecetteId: number | null = null; // Initialize it as null

  constructor(private fb: FormBuilder,private profService : UserService, private router:Router,    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    this.newProfFormGroup = this.fb.group({

      nom: this.fb.control(null, [Validators.required]),
      cne: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      tel: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      recette: this.fb.control(null, [Validators.required]),
      groupe: this.fb.control(null),
      login: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      civilite: this.fb.control(null, [Validators.required])
    });
    this.fetchRecette();

  }
  fetchRecette() {
    this.recetteService.getRecettes1().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const etapes: Recette[] = response.content;
          this.recette = etapes;
          this.recette.forEach(recetteItem => {
            console.log("claaas " + recetteItem.id);
          });
          if (this.recette.length > 0) {
            this.newProfFormGroup.patchValue({ etape: this.recette[0] });
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

  downloadXSL() {
    const xslFilePath = 'assets/DataCSV/Users.xlsx';
    fetch(xslFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Users.xlsx'; // Update with the desired filename
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


  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const fileContent = e.target.result as ArrayBuffer;
          this.parseXLSXData(fileContent);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }

  parseXLSXData(fileContent: ArrayBuffer) {
    const workbook = XLSX.read(fileContent, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    this.handleAddUserFromXLSX(data);
  }

  handleAddUserFromXLSX(data: any[]) {
    if (data && data.length > 0) {
      data.forEach((entry: CSVData) => {
        this.addUserFromXLSX(entry);
      });
    } else {
      Swal.fire('Error', 'Aucune donnée d\'étudiant valide à ajouter', 'error');
    }
  }

  addUserFromXLSX(user: CSVData) {
    if (user.recetteId) {
      const newUser: {
        recetteId: number; // Add a property for recetteId
        password: string;
        tel: string;
        cne: string;
        login: string;
        nom: string;
        prenom: string;
        email: string;
        civilite: string;
      } = {
        recetteId: user.recetteId, // Assign the recetteId
        civilite: user.civilite,
        cne: user.cne,
        email: user.email,
        login: user.login,
        nom: user.nom,
        password: user.password,
        prenom: user.prenom,
        tel: user.tel
      };

      this.profService.saveUser1(newUser, newUser.recetteId).subscribe({
        next: data => {
          console.log('User ajouté avec succès:', newUser);
          Swal.fire('Success', 'User ajouté avec succès', 'success');
        },
        error: err => {
          // Check the error response to determine if it's a successful addition or a real error
          if (err.status === 201) {
            console.log('User ajouté avec succès:', newUser);
            // Display a success message here if needed
          } else {
            // Utilize Swal.fire to display an error message
            Swal.fire('Erreur', 'Erreur lors de l\'ajout de l\'étudiant', 'error');
            console.error('Erreur lors de l\'ajout de l\'étudiant:', err);
          }
        }
      });

    } else {
      // Utilisez Swal.fire pour afficher un message d'erreur
      Swal.fire('Erreur', 'recette.id est indéfini dans les données XLSX', 'error');
      console.error('recette.id is undefined in the XLSX data');
    }
  }


  handleAddUser() {

  }
}
