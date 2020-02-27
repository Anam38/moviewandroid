import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AnimePage } from './anime.page';

describe('AnimePage', () => {
  let component: AnimePage;
  let fixture: ComponentFixture<AnimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnimePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
