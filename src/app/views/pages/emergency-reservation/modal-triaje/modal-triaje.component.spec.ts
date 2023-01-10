import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTriajeComponent } from './modal-triaje.component';

describe('ModalTriajeComponent', () => {
  let component: ModalTriajeComponent;
  let fixture: ComponentFixture<ModalTriajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTriajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTriajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
