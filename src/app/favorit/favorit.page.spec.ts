import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritPage } from './favorit.page';

describe('FavoritPage', () => {
  let component: FavoritPage;
  let fixture: ComponentFixture<FavoritPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
