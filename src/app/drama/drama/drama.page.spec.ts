import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { DramaPage } from './drama.page';

describe('Tab2Page', () => {
  let component: DramaPage;
  let fixture: ComponentFixture<DramaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DramaPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DramaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
