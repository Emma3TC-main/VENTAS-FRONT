import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoFormComponent } from '../pagos/components/pago-form/pago-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('PagoFormComponent', () => {
  let component: PagoFormComponent;
  let fixture: ComponentFixture<PagoFormComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } }
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with empty initial values', () => {
    expect(component).toBeTruthy();
    expect(component.pagoForm.value).toEqual({
      fecha: '',
      monto: '',
      metodo: '',
      contratoId: ''
    });
  });

  it('should invalidate form when empty', () => {
    component.pagoForm.setValue({
      fecha: '',
      monto: '',
      metodo: '',
      contratoId: ''
    });
    expect(component.pagoForm.invalid).toBeTrue();
  });

  it('should validate form with valid values', () => {
    component.pagoForm.setValue({
      fecha: '2024-06-01',
      monto: 1000,
      metodo: 'Efectivo',
      contratoId: 'C001'
    });
    expect(component.pagoForm.valid).toBeTrue();
  });

  it('should call onSubmit and navigate on success', fakeAsync(() => {
    component.pagoForm.setValue({
      fecha: '2024-06-01',
      monto: 1000,
      metodo: 'Efectivo',
      contratoId: 'C001'
    });

    spyOn(window, 'alert');

    component.onSubmit();
    expect(component.loading).toBeTrue();

    tick(1000);

    expect(window.alert).toHaveBeenCalledWith('Pago creado correctamente.');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pagos']);
    expect(component.loading).toBeFalse();
  }));
});
