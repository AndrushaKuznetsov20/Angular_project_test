import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AttractionService } from '../../services/attraction.service';
import { LocalityService } from '../../services/locality.service'
import { Attraction } from '../../models/attraction.model';
import { Locality } from '../../models/locality.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeAttraction } from '../../models/enum/TypeAttraction.enum';
import { TypeAssistance } from '../../models/enum/TypeAssistance.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './simpleUserPage.component.html',
  styleUrl: './simpleUserPage.component.css'
})
export class SimpleUserPageComponent {
  attractions: Attraction[] = [];
  localities: Locality[] = [];
  selectedType: TypeAttraction | null = null;
  selectedLocalityId: number | null = null;
  attractionTypes: { [key in TypeAttraction]: string } = {
    [TypeAttraction.PALACES]: 'Дворцы',
    [TypeAttraction.PARKS]: 'Парки',
    [TypeAttraction.MUSEUMS]: 'Музеи',
    [TypeAttraction.ARCHAEOLOGICAL_SITES]: 'Археологические площадки',
    [TypeAttraction.RESERVES]: 'Заповедники'
  };

  assistanceTypes: { [key in TypeAssistance]: string } = {
    [TypeAssistance.GUIDE]: 'Гид',
    [TypeAssistance.CAR_TOUR]: 'Автотур',
    [TypeAssistance.FOOD]: 'Питание',
    [TypeAssistance.PHOTOSHOOT]: 'Фотосессия',
    [TypeAssistance.EDUCATIONAL_PROGRAM]: 'Образовательная программа'
  };

  typeOptions = Object.values(TypeAttraction);

  constructor(private attractionService: AttractionService, private localityService: LocalityService) {}

  ngOnInit(): void {
    this.loadAttractions();
    this.loadLocalities();
  }

  showLocalityInfo(locality: any) {
    alert(`Информация о местоположении:\nРегион: ${locality?.region}\nГород: ${locality?.settlement}\nШирота: ${locality?.latitude}\nДолгота: ${locality?.longitude}`);
  }

  showWeatherInfo(locality: any): void  {
    this.localityService.getWeather(locality).subscribe(
      response => {
        alert("Температура: " + response.temp_c + "\n" + "состояние: "
           + response.condition + "\n" + response.recommendations);
      },
      error => {
        console.error(error);
      }
    );
  }
  

  loadAttractions(typeAttraction?: TypeAttraction, localityId?: number): void {
    this.attractionService.getAttractions(typeAttraction, localityId).subscribe(
        (data) => {
            console.log('Data received:', data);

            if (data && Array.isArray(data.attractions)) {
                this.attractions = data.attractions.map(attraction => ({
                    id: attraction.id,
                    name: attraction.name,
                    createDate: attraction.createDate,
                    briefDescription: attraction.briefDescription,
                    typeAttraction: attraction.typeAttraction,
                    locality: attraction.locality,
                    assistanceList: attraction.assistanceList
                }));
            } else {
                console.error(data); 
                this.attractions = [];
            }
        },
        (error) => {
            console.error(error);
        }
    );
}

  loadLocalities(): void {
    this.localityService.getLocalities().subscribe(
      (data) => {
        console.log('Данные локализаций:', data.localities);
        this.localities = data.localities;
      },
      (error) => {
        console.error(error);
      }
    );
}

applyFilter(): void {
  this.loadAttractions(this.selectedType!, this.selectedLocalityId!);
}

clearFilter(): void {
  this.selectedType = null; 
  this.selectedLocalityId = null;
  this.loadAttractions();
}
getAttractionType(typeAttraction: TypeAttraction): string {
  return this.attractionTypes[typeAttraction];
}

getAssistanceType(typeAssistance: TypeAssistance): string {
  return this.assistanceTypes[typeAssistance];
}
}