import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MappaPage } from './mappa.page';

describe('MappaPage', () => {
  let component: MappaPage;
  let fixture: ComponentFixture<MappaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MappaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
