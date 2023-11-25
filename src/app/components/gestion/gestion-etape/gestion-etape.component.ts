import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Etape} from "../../../models/etape.models";
import {EtapeService} from "../../../services/etape.service";

@Component({
  selector: 'app-gestion-etape',
  templateUrl: './gestion-etape.component.html',
  styleUrls: ['./gestion-etape.component.css']
})
export class GestionEtapeComponent implements OnInit{
  etapes: Etape [] = [];
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];
  constructor(
    private etapeService: EtapeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
  }
  handleEditeEtape(etapeEdit: Etape) {
    this.router.navigateByUrl('/etapes/edit',{state :etapeEdit});
  }
  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
  }


  handleDeleteEtape(etape: Etape): void {
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
        this.etapeService.deleteEtape(etape.id).subscribe();
        this.etapes = this.etapes.filter((f) => f.id !== etape.id);

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

}
