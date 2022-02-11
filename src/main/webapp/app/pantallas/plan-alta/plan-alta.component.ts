import { Component, OnInit, ViewChild } from '@angular/core';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, OperatorFunction, Subject, switchMap } from 'rxjs';
import { NgbActiveModal, NgbModal, NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';
import { IProvision, Provision } from 'app/entities/provision/provision.model';
import { ProvisionService } from 'app/entities/provision/service/provision.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { ProvisionDeleteDialogComponent } from 'app/entities/provision/delete/provision-delete-dialog.component';
import { PlanService } from 'app/entities/plan/service/plan.service';
import { IReglaPrestacion, ReglaPrestacion } from 'app/entities/regla-prestacion/regla-prestacion.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReglaPrestacionDeleteDialogComponent } from 'app/entities/regla-prestacion/delete/regla-prestacion-delete-dialog.component';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { ReglaPrestacionService } from 'app/entities/regla-prestacion/service/regla-prestacion.service';

@Component({
  selector: 'jhi-plan-alta',
  templateUrl: './plan-alta.component.html',
  styleUrls: ['./plan-alta.component.scss'],
})
export class PlanAltaComponent implements OnInit {
  // *** Práctica typeahead
  @ViewChild('instance', { static: true }) instance: NgbTypeahead | null = null;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  errorPractica = '';
  practicaSearchFailed = false;
  practicaSeleccionada: IItemNomenclador | null = null;

  practicasPosibles: (IItemNomenclador | IPrestacion)[] = [];
  // *** End práctica typeahead

  provisions: IProvision[] = [];
  planActivo: IPlan | null = null;

  prestacionBonos: IPrestacion | null = null;
  constBonosTodos = 'BONOS: Todos';

  provisionSeleccionada: IProvision | null = null;
  reglaSeleccionada: IReglaPrestacion | null = null;
  reglasDisponibles: IReglaPrestacion[] = [];
  datoNuevaRegla = '';

  nombreParaModificar = '';

  // eslint-disable-next-line
  constructor(
    protected itemNomencladorService: ItemNomencladorService,
    protected provisionService: ProvisionService,
    private modalService: NgbModal,
    private planService: PlanService,
    private prestacionService: PrestacionService,
    private reglaService: ReglaPrestacionService
  ) {}

  // eslint-disable-next-line
  ngOnInit(): void {
    this.reglaService.query().subscribe(res => {
      this.reglasDisponibles = res.body!.sort((x1, x2) => (x1.codigoRegla! < x2.codigoRegla! ? -1 : 1));
    });

    this.prestacionService.queryPorTipo('bono').subscribe(res => {
      // Debe existir una sola Prestación tipo "bono"
      this.prestacionBonos = res.body![0];
    });

    this.itemNomencladorService.query().subscribe(todas => {
      this.practicasPosibles = todas.body!.sort((x1, x2) => (x1.nombre! < x2.nombre! ? -1 : 1));
      this.practicasPosibles = [{ nombre: this.constBonosTodos }, ...this.practicasPosibles];
    });

    this.planService.find(2).subscribe(res => {
      this.planActivo = res.body;
      this.loadProvisions();
    });
  }

  loadProvisions(): void {
    if (this.planActivo) {
      this.provisionService.queryPorPlan(this.planActivo.id!).subscribe(res => {
        this.provisions = res.body!;
      });
    }
  }

  // *** Typeahead práctica

  practicaSearch: OperatorFunction<string, readonly (IItemNomenclador | IPrestacion)[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance!.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      switchMap(term => of(this.practicasPosibles.filter(practica => practica.nombre!.toLowerCase().includes(term.toLowerCase()))))
    );
  };

  // eslint-disable-next-line
  practicaResultFormatter: (item: any) => string = i => i.nombre || '';
  // eslint-disable-next-line
  practicaInputFormatter: (item: any) => string = i => i.nombre || '';

  // ** Fin typeahead práctica

  // eslint-disable-next-line
  selectItemNomenclador(item: any): void {}

  trackId(index: number, item: IProvision): number {
    return item.id!;
  }

  deleteProvision(provision: IProvision): void {
    const modalRef = this.modalService.open(ProvisionDeleteDialogComponent, { size: 'sm', backdrop: true });
    modalRef.componentInstance.provision = provision;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadProvisions();
      }
    });
  }

  iconPorTipoRegla(tipo: string): IconProp {
    switch (tipo) {
      case 'Habilita':
        return 'clipboard-check';
      case 'Carencia':
        return 'user-clock';
      case 'Descuento':
        return 'coins';
      case 'Limite':
        return 'calendar-times';
      case 'Stock':
        return 'box';
    }

    return 'mouse-pointer';
  }

  seleccionarRegla(regla: IReglaPrestacion): void {
    this.reglaSeleccionada = regla;
  }

  // eslint-disable-next-line
  deleteRegla(reglaPrestacion: IReglaPrestacion): void {
    const modalRef = this.modalService.open(ReglaPrestacionDeleteDialogComponent, { size: 'sm', backdrop: true });
    modalRef.componentInstance.reglaPrestacion = reglaPrestacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadProvisions();
      }
    });
  }

  openParaRegla(provision: IProvision, content: any): void {
    this.provisionSeleccionada = provision;
    this.open(content);
  }

  agregarRegla(): void {
    let toAdd = new ReglaPrestacion();
    toAdd = this.reglaSeleccionada!;
    toAdd.id = undefined;
    toAdd.datos = this.datoNuevaRegla;
    toAdd.provision = this.provisionSeleccionada;

    this.reglaService.create(toAdd).subscribe(res => {
      this.reglaSeleccionada = null;
      this.provisionSeleccionada = null;
      this.datoNuevaRegla = '';
      this.modalService.dismissAll();
      this.loadProvisions();
    });
  }

  // Modal
  open(content: any): void {
    // eslint-disable-next-line
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        // this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  agregarPractica(): void {
    const toAdd = new Provision();
    toAdd.plan = this.planActivo;
    toAdd.reglaPrestacions = [];
    toAdd.insumos = [];

    if (this.practicaSeleccionada?.nombre === this.constBonosTodos) {
      // Agrego Prestación Bonos
      toAdd.prestacion = this.prestacionBonos;
    } else {
      // Agrego Item Nomenclador seleccionado
      toAdd.itemNomenclador = this.practicaSeleccionada;
    }

    this.provisionService.create(toAdd).subscribe(res => {
      this.practicaSeleccionada = null;
      this.modalService.dismissAll();
      this.loadProvisions();
    });
  }

  openParaModificarNombre(content: any): void {
    this.nombreParaModificar = this.planActivo!.nombre!;
    this.open(content);
  }

  // eslint-disable-next-line
  modificarNombre(): void {
    this.planActivo!.nombre = this.nombreParaModificar;
    this.planService.update(this.planActivo!).subscribe(res => {
      this.modalService.dismissAll();
    });
  }
}
