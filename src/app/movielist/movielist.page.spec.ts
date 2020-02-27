import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovielistPage } from './movielist.page';

describe('MovielistPage', () => {
  let component: MovielistPage;
  let fixture: ComponentFixture<MovielistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovielistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovielistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
