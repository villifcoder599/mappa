import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificaPage } from './notifica.page';

describe('NotificaPage', () => {
  let component: NotificaPage;
  let fixture: ComponentFixture<NotificaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
