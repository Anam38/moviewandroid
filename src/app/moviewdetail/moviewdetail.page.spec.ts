import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoviewdetailPage } from './moviewdetail.page';

describe('MoviewdetailPage', () => {
  let component: MoviewdetailPage;
  let fixture: ComponentFixture<MoviewdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviewdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviewdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
