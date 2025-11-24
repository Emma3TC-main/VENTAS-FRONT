import { Routes } from '@angular/router';

import { Principal } from './inicio/principal';
import { ListaPropiedadesComponent } from './propiedades/lista-propiedades/lista-propiedades.component';
import { DetallePropiedadComponent } from './propiedades/detalle-propiedad/detalle-propiedad.component';
import { RegistroPropiedadComponent } from './propiedades/registro-propiedad/registro-propiedad.component';
import { ContratoComponent } from './propiedades/contrato/contrato.component';
import { GestionDocumentosComponent } from './propiedades/gestion-documentos/gestion-documentos.component';

import { ReportesComponent } from './reportes/dashboard/dashboard.component';
import { ConfiguracionComponent } from './reportes/configuracion/configuracion.component';
import { FinancieroComponent } from './reportes/financiero/financiero.component';
import { InquilinosComponent } from './reportes/inquilinos/inquilinos.component';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { PagosComponent } from './pagos/pagos.component';
import { ContratosComponent } from './contratos/contratos.component';

import { PropiedadesVistaUsuarioComponent } from './inicio-free/propiedades-vista-usuario/propiedades-vista-usuario.component';
import { DetallePropiedadVistaUsuarioComponent } from './propiedades/detalle-propiedad-usuario/detalle-propiedad-usuario.component';
// NOTA: Asegúrate que la ruta de importación de este componente sea correcta.
import { EditarPropiedadComponent } from './propiedades/editar-propiedades/editar-propiedades.component';
import { PremiumConfirmarComponent } from './pages/premium-confirmar/premium-confirmar.component';
import { PremiumCancelarComponent } from './pages/premium-cancelar/premium-cancelar.component';

export const routes: Routes = [
  { path: '', component: Principal },

  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: 'inicio-free',
    loadComponent: () =>
      import('./inicio-free/inicio-free.component').then((m) => m.InicioFreeComponent),
  },

  {
    path: 'dashboard-premium',
    loadComponent: () =>
      import('./dashboard-premium/dashboard-premium.component').then(
        (m) => m.DashboardPremiumComponent
      ),
  },

  //vista de pago

  {
    path: 'premium/confirmar',
    component: PremiumConfirmarComponent,
  },
  {
    path: 'premium/confirmar',
    component: PremiumConfirmarComponent,
  },
  {
    path: 'premium/cancelado',
    component: PremiumCancelarComponent,
  },

  // Vista pública de propiedades
  {
    path: 'propiedades-vista-usuario',
    component: PropiedadesVistaUsuarioComponent,
    title: 'Explora Propiedades',
  },
  {
    path: 'propiedad/:id',
    component: DetallePropiedadVistaUsuarioComponent,
    title: 'Detalle Propiedad',
  },

  // --- PROPIEDADES (ADMIN) ---
  { path: 'propiedades', component: ListaPropiedadesComponent },

  // 1. CREAR (Ruta específica, va antes de la parametrizada)
  {
    path: 'propiedades/crear',
    component: RegistroPropiedadComponent,
    title: 'Registrar Propiedad',
  },

  // 2. EDICIÓN (Ruta específica con parámetro, DEBE ir antes del Detalle)
  {
    path: 'propiedades/editar/:id',
    component: EditarPropiedadComponent,
    title: 'Editar Propiedad',
  },

  // Alias opcional por si tu UI aún navega a /registro-propiedad
  { path: 'registro-propiedad', redirectTo: 'propiedades/crear', pathMatch: 'full' },

  // 3. Detalle (Ruta genérica con parámetro, DEBE IR DESPUÉS de las específicas)
  {
    path: 'propiedades/:id',
    component: DetallePropiedadComponent,
    title: 'Detalle Propiedad (Admin)',
  },

  // Contratos / Documentos (admin)
  { path: 'contrato/:id', component: ContratoComponent, title: 'Gestión de Contratos' },
  { path: 'documentos/:id', component: GestionDocumentosComponent, title: 'Gestión de Documentos' },

  // Otros módulos
  { path: 'asesorias', component: AsesoriasComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'contratos', component: ContratosComponent },

  // --- REPORTES (con hijos) ---
  {
    path: 'reportes',
    component: ReportesComponent,
    title: 'Reportes y Gestión',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./reportes/dashboard/dashboard-content.component').then(
            (m) => m.DashboardContentComponent
          ),
        title: 'Vista General',
      },
      {
        path: 'notificaciones',
        loadComponent: () =>
          import('./reportes/notificaciones/notificaciones.component').then(
            (m) => m.NotificacionesComponent
          ),
        title: 'Centro de Notificaciones',
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        title: 'Configuración de Reportes',
      },
      { path: 'financiero', component: FinancieroComponent, title: 'Reporte Financiero' },
      { path: 'inquilinos', component: InquilinosComponent, title: 'Reporte Inquilinos' },
    ],
  },

  // Wildcard SIEMPRE AL FINAL
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
