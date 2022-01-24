import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cliente',
        data: { pageTitle: 'Clientes' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'individuo',
        data: { pageTitle: 'Individuos' },
        loadChildren: () => import('./individuo/individuo.module').then(m => m.IndividuoModule),
      },
      {
        path: 'tarifa',
        data: { pageTitle: 'Tarifas' },
        loadChildren: () => import('./tarifa/tarifa.module').then(m => m.TarifaModule),
      },
      {
        path: 'adhesion',
        data: { pageTitle: 'Adhesions' },
        loadChildren: () => import('./adhesion/adhesion.module').then(m => m.AdhesionModule),
      },
      {
        path: 'contrato',
        data: { pageTitle: 'Contratoes' },
        loadChildren: () => import('./contrato/contrato.module').then(m => m.ContratoModule),
      },
      {
        path: 'plan',
        data: { pageTitle: 'Plans' },
        loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule),
      },
      {
        path: 'item-factura',
        data: { pageTitle: 'ItemFacturas' },
        loadChildren: () => import('./item-factura/item-factura.module').then(m => m.ItemFacturaModule),
      },
      {
        path: 'factura',
        data: { pageTitle: 'Facturas' },
        loadChildren: () => import('./factura/factura.module').then(m => m.FacturaModule),
      },
      {
        path: 'provision',
        data: { pageTitle: 'Provisions' },
        loadChildren: () => import('./provision/provision.module').then(m => m.ProvisionModule),
      },
      {
        path: 'regla-prestacion',
        data: { pageTitle: 'ReglaPrestacions' },
        loadChildren: () => import('./regla-prestacion/regla-prestacion.module').then(m => m.ReglaPrestacionModule),
      },
      {
        path: 'prestacion',
        data: { pageTitle: 'Prestacions' },
        loadChildren: () => import('./prestacion/prestacion.module').then(m => m.PrestacionModule),
      },
      {
        path: 'insumo',
        data: { pageTitle: 'Insumos' },
        loadChildren: () => import('./insumo/insumo.module').then(m => m.InsumoModule),
      },
      {
        path: 'movimiento-stock',
        data: { pageTitle: 'MovimientoStocks' },
        loadChildren: () => import('./movimiento-stock/movimiento-stock.module').then(m => m.MovimientoStockModule),
      },
      {
        path: 'despacho',
        data: { pageTitle: 'Despachos' },
        loadChildren: () => import('./despacho/despacho.module').then(m => m.DespachoModule),
      },
      {
        path: 'chofer',
        data: { pageTitle: 'Chofers' },
        loadChildren: () => import('./chofer/chofer.module').then(m => m.ChoferModule),
      },
      {
        path: 'medico',
        data: { pageTitle: 'Medicos' },
        loadChildren: () => import('./medico/medico.module').then(m => m.MedicoModule),
      },
      {
        path: 'enfermero',
        data: { pageTitle: 'Enfermeros' },
        loadChildren: () => import('./enfermero/enfermero.module').then(m => m.EnfermeroModule),
      },
      {
        path: 'movil',
        data: { pageTitle: 'Movils' },
        loadChildren: () => import('./movil/movil.module').then(m => m.MovilModule),
      },
      {
        path: 'solicitud-prestacion',
        data: { pageTitle: 'SolicitudPrestacions' },
        loadChildren: () => import('./solicitud-prestacion/solicitud-prestacion.module').then(m => m.SolicitudPrestacionModule),
      },
      {
        path: 'item-nomenclador',
        data: { pageTitle: 'ItemNomencladors' },
        loadChildren: () => import('./item-nomenclador/item-nomenclador.module').then(m => m.ItemNomencladorModule),
      },
      {
        path: 'prestador',
        data: { pageTitle: 'Prestadors' },
        loadChildren: () => import('./prestador/prestador.module').then(m => m.PrestadorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
