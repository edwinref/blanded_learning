import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  active:number=0;
   sidebarItems:any[] = [];

  sidebarAdminItems = [

  {
    link: "/home",
    title: "Home",
    icon: "../assets/img/icons/icons8-home-64.png"
  },
  /*{
    link: "/emploitemps",
    title: "Emploi du temps",
    icon: "fas fa-clipboard-list"
  },*/
    {
      link: "/ingredients",
      title: "Ingredients",
      icon: "../assets/img/icons/icons8-classroom-50.png"
    } ,
    {
      link: "/etapes",
      title: "Etapes",
      icon: "../assets/img/icons/icons8-descending-sorting-50.png"
    },


    {
      link: "/user",
      title: "Users",
      icon: "../assets/img/icons/icons8-student-50.png"
    },
  {
    link: "/recettes",
    title: "Recettes",
    icon: "../assets/img/icons/icons8-level-50.png"
  }



];

sidebarProfItems = [
  {
    link: "/home",
    title: "Home",
    icon: "../assets/img/icons/icons8-home-64.png"
  }


]

  sidebarEtudItems = [
    {
      link: "/home",
      title: "Home",
      icon: "../assets/img/icons/icons8-home-64.png"
    },

  ]
  constructor(private cookieService: CookieService) { }

  handleChangeBars(index: number): void {
    this.active = index;
  }


  ngOnInit(): void {

    if(this.cookieService.get('role') == "Administrateur"){
     this.sidebarItems= this.sidebarAdminItems;
    }else if(this.cookieService.get('role') == "User"){
     this.sidebarItems= this.sidebarEtudItems;
    }else{
      this.sidebarItems= this.sidebarProfItems;
    }

}
}
