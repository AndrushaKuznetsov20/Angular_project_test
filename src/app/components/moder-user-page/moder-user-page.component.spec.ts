import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerUserPageComponent } from './moder-user-page.component';

describe('ModerUserPageComponent', () => {
  let component: ModerUserPageComponent;
  let fixture: ComponentFixture<ModerUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
