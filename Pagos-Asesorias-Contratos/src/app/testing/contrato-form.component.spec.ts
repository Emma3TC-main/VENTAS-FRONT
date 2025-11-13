import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContratoFormComponent } from '../contratos/components/contrato-form/contrato-form.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('ContratoFormComponent', () => {
  let component: ContratoFormComponent;
  let fixture: ComponentFixture<ContratoFormComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContratoFormComponent],
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
    fixture = TestBed.createComponent(ContratoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with empty initial values', () => {
    expect(component).toBeTruthy();
    expect(component.contratoForm.value).toEqual({
      cliente: '',
      inmueble: '',
      fechaInicio: '',
      fechaFin: '',
      estado: ''
    });
  });

  it('should invalidate form when empty', () => {
    component.contratoForm.setValue({
      cliente: '',
      inmueble: '',
      fechaInicio: '',
      fechaFin: '',
      estado: ''
    });
    expect(component.contratoForm.invalid).toBeTrue();
  });

  it('should validate form with valid values', () => {
    component.contratoForm.setValue({
      cliente: 'Juan Pérez',
      inmueble: 'Inmueble A',
      fechaInicio: '2024-01-01',
      fechaFin: '2025-01-01',
      estado: 'activo'
    });
    expect(component.contratoForm.valid).toBeTrue();
  });

  it('should call onSubmit and navigate on success', fakeAsync(() => {
    component.contratoForm.setValue({
      cliente: 'Juan Pérez',
      inmueble: 'Inmueble A',
      fechaInicio: '2024-01-01',
      fechaFin: '2025-01-01',
      estado: 'activo'
    });

    spyOn(window, 'alert');

    component.onSubmit();
    expect(component.loading).toBeTrue();

    tick(1000);

    expect(window.alert).toHaveBeenCalledWith('Contrato creado correctamente.');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/contratos']);
    expect(component.loading).toBeFalse();
  }));
});
