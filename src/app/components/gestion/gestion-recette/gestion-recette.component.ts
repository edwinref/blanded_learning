import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Recette} from "../../../models/recette.models";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {RecetteService} from "../../../services/recette.service";

@Component({
  selector: 'app-gestion-recette',
  templateUrl: './gestion-recette.component.html',
  styleUrls: ['./gestion-recette.component.css']
})
export class GestionRecetteComponent implements OnInit {
  recettes: Recette [] = [];
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];
  constructor(
    private recetteService: RecetteService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
  }
  handleEditeRecette(recetteEdit: Recette) {
    this.router.navigateByUrl('/recettes/edit',{state :recetteEdit});
  }

  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
  }

  handleDeleteRecette(recette: Recette): void {
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
        this.recetteService.deleteRecette(recette.id).subscribe();
        this.recettes= this.recettes.filter((c) => c.id !== recette.id);

      }
    });
  }

  setDisplayedPages(): void {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (
      let i = startPage;
      i < startPage + 3 && i < this.totalPages;
      i++
    ) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.page = page;
  }

  goToPreviousSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage;
    }
  }

  goToNextSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
    }
  }

  handleSearchRecettes() {

  }
}
