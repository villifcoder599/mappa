import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomAlertPage } from './custom-alert.page';

describe('CustomAlertPage', () => {
  let component: CustomAlertPage;
  let fixture: ComponentFixture<CustomAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
