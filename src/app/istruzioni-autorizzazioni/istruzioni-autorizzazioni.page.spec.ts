import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IstruzioniAutorizzazioniPage } from './istruzioni-autorizzazioni.page';

describe('IstruzioniAutorizzazioniPage', () => {
  let component: IstruzioniAutorizzazioniPage;
  let fixture: ComponentFixture<IstruzioniAutorizzazioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstruzioniAutorizzazioniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IstruzioniAutorizzazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
