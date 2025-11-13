import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PagosListComponent } from '../pagos/components/pagos-list/pagos-list.component';
import { By } from '@angular/platform-browser';

describe('PagosListComponent', () => {
  let component: PagosListComponent;
  let fixture: ComponentFixture<PagosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagosListComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load pagos', () => {
    expect(component).toBeTruthy();
    expect(component.pagos.length).toBeGreaterThan(0);
  });

  it('should filter pagos by contratoId', () => {
    component.filterForm.controls['contratoId'].setValue('C001');
    fixture.detectChanges();
    expect(component.filteredPagos.every(p => p.contratoId === 'C001')).toBeTrue();
  });

  it('should show no pagos when filter does not match', () => {
    component.filterForm.controls['contratoId'].setValue('noexistente');
    fixture.detectChanges();
    expect(component.filteredPagos.length).toBe(0);
  });

  it('should call onEdit and onDelete methods', () => {
    spyOn(component, 'onEdit');
    spyOn(component, 'onDelete');
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('button[aria-label="Editar pago"]'));
    const deleteButton = fixture.debugElement.query(By.css('button[aria-label="Eliminar pago"]'));

    editButton.triggerEventHandler('click', null);
    deleteButton.triggerEventHandler('click', null);

    expect(component.onEdit).toHaveBeenCalled();
    expect(component.onDelete).toHaveBeenCalled();
  });
});
