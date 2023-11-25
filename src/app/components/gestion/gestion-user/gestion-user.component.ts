import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RecetteService} from "../../../services/recette.service";
import {User} from "../../../models/user.model";
import {Recette} from "../../../models/recette.models";
import {UserService} from "../../../services/user-service.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent {
  @ViewChild('exampleModal') modal: any;
  recettes: Recette[] = [];
  selectedRecette!: Recette;
  etuds: User[] = [];

  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];
  option1:number=0;
  option2:number=0;
  option3:number=0;
  option4:number=0;

  ngOnInit(): void {
    this.getRecettes();
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });

  }
  constructor(private recetteService:RecetteService,
              private fb: FormBuilder,
              private userService:UserService,
              private router: Router) {

  }
  private getRecettes() {
    this.recetteService.getRecettess().subscribe(data => {
      this.recettes = data;
      console.log(this.recettes)
    });
  }
  closeModal() {
    this.modal.hide(); // You should use the correct method for your specific modal library, e.g., .hide() for Bootstrap modal.
  }

  searchEtud(recette:Recette) {
    if (recette != null) {
      this.userService.searchEtud(recette.id).subscribe(data => {
        this.etuds = data
        console.log(this.etuds)
      })
    }
    else {
      this.etuds = []
    }
  }

  handleEditeEtud(etud: User) {
    this.router.navigateByUrl('/etud/edit',{state :etud});
  }

  handleDeleteEtud(etud: User) {
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
        this.userService.deleteEud(etud.id).subscribe();
        this.etuds.splice( this.etuds.indexOf(etud),1);

      }
    });
  }


  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
  }


  setDisplayedPages() {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (let i = startPage; i < startPage + 3 && i < this.totalPages; i++) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.page = page; // Update the page parameter
  }

  goToPreviousSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage; // Update the page parameter
    }
  }

  goToNextSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage; // Update the page parameter
    }
  }
}
