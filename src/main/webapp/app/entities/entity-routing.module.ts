import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cliente',
        data: { pageTitle: 'ssoc22App.cliente.home.title' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'individuo',
        data: { pageTitle: 'ssoc22App.individuo.home.title' },
        loadChildren: () => import('./individuo/individuo.module').then(m => m.IndividuoModule),
      },
      {
        path: 'tarifa',
        data: { pageTitle: 'ssoc22App.tarifa.home.title' },
        loadChildren: () => import('./tarifa/tarifa.module').then(m => m.TarifaModule),
      },
      {
        path: 'adhesion',
        data: { pageTitle: 'ssoc22App.adhesion.home.title' },
        loadChildren: () => import('./adhesion/adhesion.module').then(m => m.AdhesionModule),
      },
      {
        path: 'contrato',
        data: { pageTitle: 'ssoc22App.contrato.home.title' },
        loadChildren: () => import('./contrato/contrato.module').then(m => m.ContratoModule),
      },
      {
        path: 'plan',
        data: { pageTitle: 'ssoc22App.plan.home.title' },
        loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule),
      },
      {
        path: 'item-factura',
        data: { pageTitle: 'ssoc22App.itemFactura.home.title' },
        loadChildren: () => import('./item-factura/item-factura.module').then(m => m.ItemFacturaModule),
      },
      {
        path: 'factura',
        data: { pageTitle: 'ssoc22App.factura.home.title' },
        loadChildren: () => import('./factura/factura.module').then(m => m.FacturaModule),
      },
      {
        path: 'provision',
        data: { pageTitle: 'ssoc22App.provision.home.title' },
        loadChildren: () => import('./provision/provision.module').then(m => m.ProvisionModule),
      },
      {
        path: 'regla-prestacion',
        data: { pageTitle: 'ssoc22App.reglaPrestacion.home.title' },
        loadChildren: () => import('./regla-prestacion/regla-prestacion.module').then(m => m.ReglaPrestacionModule),
      },
      {
        path: 'prestacion',
        data: { pageTitle: 'ssoc22App.prestacion.home.title' },
        loadChildren: () => import('./prestacion/prestacion.module').then(m => m.PrestacionModule),
      },
      {
        path: 'insumo',
        data: { pageTitle: 'ssoc22App.insumo.home.title' },
        loadChildren: () => import('./insumo/insumo.module').then(m => m.InsumoModule),
      },
      {
        path: 'movimiento-stock',
        data: { pageTitle: 'ssoc22App.movimientoStock.home.title' },
        loadChildren: () => import('./movimiento-stock/movimiento-stock.module').then(m => m.MovimientoStockModule),
      },
      {
        path: 'despacho',
        data: { pageTitle: 'ssoc22App.despacho.home.title' },
        loadChildren: () => import('./despacho/despacho.module').then(m => m.DespachoModule),
      },
      {
        path: 'chofer',
        data: { pageTitle: 'ssoc22App.chofer.home.title' },
        loadChildren: () => import('./chofer/chofer.module').then(m => m.ChoferModule),
      },
      {
        path: 'medico',
        data: { pageTitle: 'ssoc22App.medico.home.title' },
        loadChildren: () => import('./medico/medico.module').then(m => m.MedicoModule),
      },
      {
        path: 'enfermero',
        data: { pageTitle: 'ssoc22App.enfermero.home.title' },
        loadChildren: () => import('./enfermero/enfermero.module').then(m => m.EnfermeroModule),
      },
      {
        path: 'movil',
        data: { pageTitle: 'ssoc22App.movil.home.title' },
        loadChildren: () => import('./movil/movil.module').then(m => m.MovilModule),
      },
      {
        path: 'solicitud-prestacion',
        data: { pageTitle: 'ssoc22App.solicitudPrestacion.home.title' },
        loadChildren: () => import('./solicitud-prestacion/solicitud-prestacion.module').then(m => m.SolicitudPrestacionModule),
      },
      {
        path: 'item-nomenclador',
        data: { pageTitle: 'ssoc22App.itemNomenclador.home.title' },
        loadChildren: () => import('./item-nomenclador/item-nomenclador.module').then(m => m.ItemNomencladorModule),
      },
      {
        path: 'prestador',
        data: { pageTitle: 'ssoc22App.prestador.home.title' },
        loadChildren: () => import('./prestador/prestador.module').then(m => m.PrestadorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
