import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalityService } from '../../services/locality.service';
import { AssistanceService } from '../../services/assistance.service'
import { HttpClientModule } from '@angular/common/http';
import { AttractionService } from '../../services/attraction.service';
import { TypeAttraction } from '../../models/enum/TypeAttraction.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeAssistance } from '../../models/enum/TypeAssistance.enum';

@Component({
  selector: 'app-moder-user-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './moder-user-page.component.html',
  styleUrls: ['./moder-user-page.component.css']
})
export class ModerUserPageComponent implements OnInit {
  newBriefDescription: string = '';
  localities: any[] = [];
  assistances: any[] = [];
  attractions: any[] = [];
  selectedAttractionId: number | null = null;
  selectedAssistanceId: number | null = null;
  attractionForm: FormGroup;
  localityForm: FormGroup;
  assistanceForm: FormGroup;
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

  typeOptions1: { id: string, name: string }[] = [];
  typeOptions: { id: string, name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private localityService: LocalityService,
    private attractionService: AttractionService,
    private assistanceService: AssistanceService
  ) {
    this.attractionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      briefDescription: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      typeAttraction: [''],
      locality: ['', Validators.required]
    });

    this.localityForm = this.fb.group({
      settlement: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      region: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });

    this.assistanceForm = this.fb.group({
      typeAssistance: [''],
      briefDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      performer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.loadLocalities();
    this.loadAssistances();
    this.loadAttractions();
    this.typeOptions1 = Object.entries(this.assistanceTypes).map(([key, value]) => ({
      id: key,
      name: value
    }));
    
    this.typeOptions = Object.entries(this.attractionTypes).map(([key, value]) => ({
      id: key,
      name: value
    }));
  }

  showLocalityInfo(locality: any) {
    alert(`Информация о местоположении:\nРегион: ${locality?.region}\nГород: ${locality?.settlement}\nШирота: ${locality?.latitude}\nДолгота: ${locality?.longitude}`);
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

  loadAttractions(): void {
    this.attractionService.getAttractions().subscribe(
      (data) => {
        this.attractions = data.attractions;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadAssistances(): void {
    this.assistanceService.getAssistances().subscribe(
      (data) => {
        this.assistances = data.assistances;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  createAttraction(): void {
    if (this.attractionForm.valid) {
      const attractionData = {
        ...this.attractionForm.value,
        locality: { id: this.attractionForm.value.locality }
      };
  
      console.log('Данные для отправки:', attractionData);
      this.attractionService.createAttraction(attractionData).subscribe(
        response => {
          alert(response);
          this.attractionForm.reset();
          this.ngOnInit();
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  
  createLocality(): void {
    if (this.localityForm.valid) {
      this.localityService.createLocality(this.localityForm.value).subscribe(
        response => {
          alert(response);
          this.localityForm.reset();
          this.ngOnInit();
        },
        error => {
          console.error('Ошибка при создании локации:', error);
        }
      );
    }
  }

  createAssistance(): void {
    if (this.assistanceForm.valid) {
      this.assistanceService.createAssistance(this.assistanceForm.value).subscribe(
        response => {
          alert(response);
          this.assistanceForm.reset();
          this.ngOnInit();
        },
        error => {
          console.error('Ошибка при создании услуги:', error);
        }
      );
    }
  }

  addAttractionToAssistance(assistanceId: number): void {
    if (this.selectedAttractionId) {
      this.assistanceService.addAttractionToAssistance(assistanceId, this.selectedAttractionId).subscribe(
        response => {
          console.log('Ответ от сервера:', response);
          alert(response);
          this.ngOnInit();
        },
        error => {
          console.error(error);
        });
    }
  }

  updateAttraction(attractionId: number, briefDescription: string): void {
    const updatedAttraction = { briefDescription };

    this.attractionService.updateAttraction(attractionId, updatedAttraction).subscribe(
      response => {
        alert(response);
        this.loadAttractions();
        this.newBriefDescription = " ";
      },
      error => {
        console.error('Ошибка при обновлении достопримечательности:', error);
      }
    );
  }
  
  deleteAttraction(attractionId: number): void {
    this.attractionService.deleteAttraction(attractionId).subscribe(
      response => {
        alert(response);
        this.loadAttractions();
      },
      error => {
        console.error('Ошибка при удалении достопримечательности:', error);
      }
    );
  }

  deleteAssistance(assistanceId: number): void {
    this.assistanceService.deleteAssistance(assistanceId).subscribe(
      response => {
        alert(response);
        this.loadAssistances();
      },
      error => {
        console.error('Ошибка при удалении услуги:', error);
      }
    );
  }

  deleteLocality(localityId: number): void {
    this.localityService.deleteLocality(localityId).subscribe(
      response => {
        alert(response);
        this.loadLocalities();
      },
      error => {
        console.error('Ошибка при удалении местоположения:', error);
      }
    );
  }

    getAssistanceType(typeAssistance: TypeAssistance): string {
      return this.assistanceTypes[typeAssistance];
  }

  getAttractionType(typeAttraction: TypeAttraction): string {
    return this.attractionTypes[typeAttraction];
  }
}