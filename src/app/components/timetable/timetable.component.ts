import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {EtudiantService} from "../../services/etudiant.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  events = [
    {
      title: 'Developpement JEE',
      start: '2023-12-05T14:30:00',
      backgroundColor: 'blue',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.lachgar',
        location: 'A1',
      },
    },
    {
      title: 'cloud',
      start: '2023-12-05T10:30:00',
      backgroundColor: 'green',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'A.aqqal',
        location: 'A2',
      },
    },
    {
      title: 'machine learning',
      start: '2023-12-06T14:30:00',
      backgroundColor: 'blue',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    { }
    // Add more events as needed
  ];

  ngOnInit(): void {
    this.getEtudByID()
  }
  constructor(private etudeService:EtudiantService,  private cookieService: CookieService) {
  }
  etud:any;
  getEtudByID(){
    this.etudeService.getById(Number(this.cookieService.get('userId'))).subscribe(data =>{
      this.etud = data;
      console.log(this.etud)
    }, error => {
      console.log(error)
    })
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: this.events,
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.customizeEvent.bind(this)
  };

  handleEventClick(arg: EventClickArg) {
    // Handle event click if needed
    console.log('Event clicked:', arg.event.title);
  }

  customizeEvent(arg: EventContentArg) {
    // Customize the style of each event
    const content = document.createElement('div');

    // Display title and start time
    content.innerHTML = `<b>${arg.event.title}</b><br>${arg.event.start!.toLocaleTimeString()}`;

    // Check for additional attributes and display them
    const additionalProps = arg.event.extendedProps;
    if (additionalProps) {
      for (const prop in additionalProps) {
        if (additionalProps.hasOwnProperty(prop) && prop !== 'backgroundColor' && prop !== 'textColor' && prop !== 'borderColor') {
          content.innerHTML += `<br><b>${prop}:</b> ${additionalProps[prop]}`;
        }
      }

      // Apply styling based on the extendedProps
      content.style.backgroundColor = arg.event['backgroundColor'] || 'blue';
      content.style.color = additionalProps['textColor'] || 'white';  // Use square brackets for textColor
      content.style.borderColor = additionalProps['borderColor'] || 'black';  // Use square brackets for borderColor
    }

    content.style.border = 'none';
    content.style.borderRadius = '5px';
    content.style.padding = '5px';

    return { domNodes: [content] };
  }



}
