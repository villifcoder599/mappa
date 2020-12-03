import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectionLineColorPage } from './selection-line-color.page';

describe('SelectionLineColorPage', () => {
  let component: SelectionLineColorPage;
  let fixture: ComponentFixture<SelectionLineColorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionLineColorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionLineColorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
