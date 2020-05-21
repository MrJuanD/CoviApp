import { Component, OnInit, Input } from '@angular/core';
import { Information } from '../Models/Information';
import { Country } from '../Models/Country';
import { CovidService } from '../services/covid.service';
import { Global } from '../Models/Global';
import { Storage } from '@ionic/storage';
import { Result } from '../Models/Result';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {

  @Input() name: string;
  @Input() pageNumber: number;

  informations: Information[];
  countryList: Country[];
  filteredCountryList: Country[];
  global: Global;
  date: Date;
  
  constructor(private covidService: CovidService, private storage: Storage) { }

  ngOnInit() {
    this.getInformations();
    this.getList();
  }

  getList() {
    this.covidService.getCountryList().subscribe(result => {
      this.storage.set("result", result);
      this.countryList = result.Countries;
      this.filteredCountryList = result.Countries;
      this.global = result.Global;
      this.date = result.Date;
    },   error => {
      this.storage.get("result").then(result => {
        this.countryList = result.Countries;
        this.filteredCountryList = result.Countries;
        this.global = result.Global;
        this.date = result.Date;
      });
    });
  }

  formatDate(date: string) {
    let newDate = new Date(date);
    return newDate.toLocaleString().slice(0, newDate.toLocaleString().length - 3);
  }

  filter(event) {
    this.filteredCountryList = this.countryList.filter(item => item.Country.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(event.target.value);
  }

  getInformations() {
    this.informations = [];

    this.informations.push({title: "Know about COVID-19", icon: "medical-outline",  paragraphs: ["Coronavirus (COVID-19) is an illness caused by a virus that can spread from person to person.",
  "The virus that causes COVID-19 is a new coronavirus that has spread throughout the world.", "COVID-19 symptoms can range from mild (or no symptoms) to severe illness."]});
 
  this.informations.push({title: "Know how COVID-19 is spread", icon: "water-outline", paragraphs: ["You can become infected by coming into close contact (about 6 feet or two arm lengths) with a person who has COVID-19. COVID-19 is primarily spread from person to person.",
  "You can become infected from respiratory droplets when an infected person coughs, sneezes, or talks.", "You may also be able to get it by touching a surface or object that has the virus on it, and then by touching your mouth, nose, or eyes."]});
 
  this.informations.push({title: "Protect yourself and others from COVID-19", icon: "shield-outline", paragraphs: ["There is currently no vaccine to protect against COVID-19. The best way to protect yourself is to avoid being exposed to the virus that causes COVID-19.",
  "Stay home as much as possible and avoid close contact with others.", "Wear a cloth face covering that covers your nose and mouth in public settings.", "Clean and disinfect frequently touched surfaces.", "Wash your hands often with soap and water for at least 20 seconds, or use an alcoholbased hand sanitizer that contains at least 60% alcohol."]});

  this.informations.push({title: "Practice social distancing", icon: "hand-right-outline", paragraphs: ["Buy groceries and medicine, go to the doctor, and complete banking activities online when possible.",
  "If you must go in person, stay at least 6 feet away from others and disinfect items you must touch.", "Get deliveries and takeout, and limit in-person contact as much as possible."]});

  this.informations.push({title: "Prevent the spread of COVID-19 if you are sick", icon: "alert-outline", paragraphs: ["Stay home if you are sick, except to get medical care.",
  "Avoid public transportation, ride-sharing, or taxis.", "Separate yourself from other people and pets in your home.", "There is no specific treatment for COVID-19, but you can seek medical care to help relieve your symptoms.", "If you need medical attention, call ahead."]});

  this.informations.push({title: "Know your risk for severe illness", icon: "fitness-outline", paragraphs: ["Everyone is at risk of getting COVID-19.",
  "Older adults and people of any age who have serious underlying medical conditions may be at higher risk for more severe illness."]});
  }
}
