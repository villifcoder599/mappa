import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltroIstruzioniAutorizzazionePage } from './filtro-istruzioni-autorizzazione.page';

describe('FiltroIstruzioniAutorizzazionePage', () => {
  let component: FiltroIstruzioniAutorizzazionePage;
  let fixture: ComponentFixture<FiltroIstruzioniAutorizzazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroIstruzioniAutorizzazionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroIstruzioniAutorizzazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
