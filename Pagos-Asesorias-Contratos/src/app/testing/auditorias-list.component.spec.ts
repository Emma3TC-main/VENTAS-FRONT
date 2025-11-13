import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuditoriasListComponent } from '../auditorias/components/auditorias-list/auditorias-list.component';
import { By } from '@angular/platform-browser';

describe('AuditoriasListComponent', () => {
  let component: AuditoriasListComponent;
  let fixture: ComponentFixture<AuditoriasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuditoriasListComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load auditorias', () => {
    expect(component).toBeTruthy();
    expect(component.auditorias.length).toBeGreaterThan(0);
  });

  it('should filter auditorias by usuario', () => {
    component.filterForm.controls['usuario'].setValue('juanp');
    fixture.detectChanges();
    expect(component.filteredAuditorias.every(a => a.usuario === 'juanp')).toBeTrue();
  });

  it('should filter auditorias by accion', () => {
    component.filterForm.controls['accion'].setValue('crear');
    fixture.detectChanges();
    expect(component.filteredAuditorias.every(a => a.accion.toLowerCase().includes('crear'))).toBeTrue();
  });

  it('should show no auditorias when filter does not match', () => {
    component.filterForm.controls['usuario'].setValue('noexistente');
    fixture.detectChanges();
    expect(component.filteredAuditorias.length).toBe(0);
  });
});
