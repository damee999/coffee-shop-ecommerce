import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeansPage } from './beans';

describe('BeansPage', () => {
  let component: BeansPage;
  let fixture: ComponentFixture<BeansPage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeansPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeansPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
