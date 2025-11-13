import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContratosListComponent } from '../contratos/components/contratos-list/contratos-list.component';
import { By } from '@angular/platform-browser';

describe('ContratosListComponent', () => {
  let component: ContratosListComponent;
  let fixture: ComponentFixture<ContratosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContratosListComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load contratos', () => {
    expect(component).toBeTruthy();
    expect(component.contratos.length).toBeGreaterThan(0);
  });

  it('should filter contratos by cliente', () => {
    component.filterForm.controls['cliente'].setValue('Juan');
    fixture.detectChanges();
    expect(component.filteredContratos.every(c => c.cliente.toLowerCase().includes('juan'))).toBeTrue();
  });

  it('should filter contratos by estado', () => {
    component.filterForm.controls['estado'].setValue('activo');
    fixture.detectChanges();
    expect(component.filteredContratos.every(c => c.estado === 'activo')).toBeTrue();
  });

  it('should show no contratos when filter does not match', () => {
    component.filterForm.controls['cliente'].setValue('noexistente');
    fixture.detectChanges();
    expect(component.filteredContratos.length).toBe(0);
  });

  it('should call onEdit and onDelete', () => {
    spyOn(component, 'onEdit');
    spyOn(component, 'onDelete');
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('button[aria-label="Editar contrato"]'));
    const deleteButton = fixture.debugElement.query(By.css('button[aria-label="Eliminar contrato"]'));

    editButton.triggerEventHandler('click', null);
    deleteButton.triggerEventHandler('click', null);

    expect(component.onEdit).toHaveBeenCalled();
    expect(component.onDelete).toHaveBeenCalled();
  });
});
