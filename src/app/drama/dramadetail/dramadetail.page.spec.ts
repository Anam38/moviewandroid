import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DramadetailPage } from './dramadetail.page';

describe('DramadetailPage', () => {
  let component: DramadetailPage;
  let fixture: ComponentFixture<DramadetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DramadetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DramadetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
