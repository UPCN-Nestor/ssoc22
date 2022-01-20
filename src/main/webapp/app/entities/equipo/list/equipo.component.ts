import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEquipo } from '../equipo.model';
import { EquipoService } from '../service/equipo.service';
import { EquipoDeleteDialogComponent } from '../delete/equipo-delete-dialog.component';

@Component({
  selector: 'jhi-equipo',
  templateUrl: './equipo.component.html',
})
export class EquipoComponent implements OnInit {
  equipos?: IEquipo[];
  isLoading = false;

  constructor(protected equipoService: EquipoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.equipoService.query().subscribe({
      next: (res: HttpResponse<IEquipo[]>) => {
        this.isLoading = false;
        this.equipos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEquipo): number {
    return item.id!;
  }

  delete(equipo: IEquipo): void {
    const modalRef = this.modalService.open(EquipoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.equipo = equipo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
