import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { AuditoriaDetailComponent } from '../auditorias/components/auditoria-detail/auditoria-detail.component';
import { of } from 'rxjs';

describe('AuditoriaDetailComponent', () => {
  let component: AuditoriaDetailComponent;
  let fixture: ComponentFixture<AuditoriaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuditoriaDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'a1' } } }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load auditoria detail', fakeAsync(() => {
    expect(component).toBeTruthy();
    expect(component.loading).toBeTrue();

    tick(500);
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.auditoria).toBeTruthy();
    expect(component.auditoria?.id).toBe('a1');
  }));

  it('should show error if id not provided', () => {
    component.errorMessage = '';
    component.auditoria = null;
    (component as any).route.snapshot.paramMap.get = () => null;
    component.ngOnInit();
    expect(component.errorMessage).toBe('ID de auditoría no especificado.');
  });
});
