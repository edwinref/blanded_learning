import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Prof } from 'src/app/models/prof.models';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import Swal from 'sweetalert2';
import {Etudiant} from "../../../models/etudiant.model";
import {EtudiantService} from "../../../services/etudiant.service";
import {Classe} from "../../../models/classes.models";
import {ClasseService} from "../../../services/classe.service";
import * as XLSX from 'xlsx';
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
  classeId: number;
}


@Component({
  selector: 'app-add-new-prof',
  templateUrl: './add-new-etudiant.component.html',
  styleUrls: ['./add-new-etudiant.component.css']
})



export class AddNewEtudiantComponent {
  newProfFormGroup!: FormGroup;
  classe: Classe[] = [];

  constructor(private fb: FormBuilder,private profService : EtudiantService, private router:Router,    private classeService: ClasseService,
  ) {}

  ngOnInit(): void {
    this.newProfFormGroup = this.fb.group({

      nom: this.fb.control(null, [Validators.required]),
      cne: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      tel: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      classe: this.fb.control(null, [Validators.required]),
      login: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      civilite: this.fb.control(null, [Validators.required])
    });
    this.fetchClasse();

  }
  fetchClasse() {
    this.classeService.getClasses1().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Classe[] = response.content;
          this.classe = filieres;
          this.classe.forEach(classeItem => {
            console.log("claaas " + classeItem.id);
          });
          if (this.classe.length > 0) {
            this.newProfFormGroup.patchValue({ filiere: this.classe[0] });
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
  handleAddEtudiant() {
    if (this.newProfFormGroup.valid) {
      const newEtudiant: Etudiant = this.newProfFormGroup.value;
      const selectedClasseId: number = +newEtudiant.classe; // Use a type assertion if necessary

      const classeId = this.classe.find(classe => classe.id === selectedClasseId);
      if (classeId) {
        newEtudiant.classe = classeId; // Create a Classe object with the selected ID
        console.log("class" + classeId.id);
        this.profService.saveEtudiant(newEtudiant, classeId.id).subscribe({

          next: data => {
            console.log('dataaa ')
            console.log(newEtudiant)
            Swal.fire('Success', 'Etudiant ajouté avec succès', 'success');
            this.router.navigateByUrl('/etudiant');
          },
          error: err => {
            console.error(err);
            if (err.error && err.error.message) {
              Swal.fire('Error', err.error.message, 'error');
            } else {
              Swal.fire('Error', 'Une erreur s est produite lors de l ajout de l étudiant', 'error');
            }
          }
        });
      } else {
        Swal.fire('Error', 'Veuillez sélectionner une classe avant d ajouter l étudiant', 'error');
      }
    } else {
      Swal.fire('Error', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
    }
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

    this.handleAddEtudiantFromXLSX(data);
  }

  handleAddEtudiantFromXLSX(data: any[]) {
    if (data && data.length > 0) {
      data.forEach((entry: CSVData) => {
        this.addEtudiantFromXLSX(entry);
      });
    } else {
      Swal.fire('Error', 'Aucune donnée d\'étudiant valide à ajouter', 'error');
    }
  }

  addEtudiantFromXLSX(etudiant: CSVData) {
    if (etudiant.classeId) {
      const newEtudiant: {
        classeId: number; // Add a property for classeId
        password: string;

        tel: string;
        cne: string;
        login: string;
        nom: string;
        prenom: string;
        email: string;
        civilite: string;
      } = {
        classeId: etudiant.classeId, // Assign the classeId
        civilite: etudiant.civilite,
        cne: etudiant.cne,
        email: etudiant.email,
        login: etudiant.login,
        nom: etudiant.nom,
        password: etudiant.password,
        prenom: etudiant.prenom,
        tel: etudiant.tel
      };

      // Find the Classe object for the Etudiant
      // ...

      // Save the Etudiant to the database
      this.profService.saveEtudiant1(newEtudiant, newEtudiant.classeId).subscribe({
        next: data => {
          console.log('Etudiant ajouté avec succès:', newEtudiant);
        },
        error: err => {
          console.error('Erreur lors de l\'ajout de l\'étudiant:', err);
        }
      });
    } else {
      console.error('classe.id is undefined in the XLSX data');
    }
  }



}
