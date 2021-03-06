import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISolicitudPrestacion, SolicitudPrestacion } from '../solicitud-prestacion.model';

import { SolicitudPrestacionService } from './solicitud-prestacion.service';

describe('SolicitudPrestacion Service', () => {
  let service: SolicitudPrestacionService;
  let httpMock: HttpTestingController;
  let elemDefault: ISolicitudPrestacion;
  let expectedResult: ISolicitudPrestacion | ISolicitudPrestacion[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SolicitudPrestacionService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      tipo: 'AAAAAAA',
      numero: 0,
      horaSolicitud: currentDate,
      domicilio: 'AAAAAAA',
      telefono: 'AAAAAAA',
      edad: 0,
      motivoLlamado: 'AAAAAAA',
      seEfectuo: false,
      internacion: false,
      observaciones: 'AAAAAAA',
      individuoAdhoc: 'AAAAAAA',
      precioReal: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          horaSolicitud: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a SolicitudPrestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          horaSolicitud: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          horaSolicitud: currentDate,
        },
        returnedFromService
      );

      service.create(new SolicitudPrestacion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SolicitudPrestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          numero: 1,
          horaSolicitud: currentDate.format(DATE_TIME_FORMAT),
          domicilio: 'BBBBBB',
          telefono: 'BBBBBB',
          edad: 1,
          motivoLlamado: 'BBBBBB',
          seEfectuo: true,
          internacion: true,
          observaciones: 'BBBBBB',
          individuoAdhoc: 'BBBBBB',
          precioReal: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          horaSolicitud: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SolicitudPrestacion', () => {
      const patchObject = Object.assign(
        {
          tipo: 'BBBBBB',
          numero: 1,
          horaSolicitud: currentDate.format(DATE_TIME_FORMAT),
          domicilio: 'BBBBBB',
          telefono: 'BBBBBB',
          edad: 1,
          seEfectuo: true,
          observaciones: 'BBBBBB',
          individuoAdhoc: 'BBBBBB',
        },
        new SolicitudPrestacion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          horaSolicitud: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SolicitudPrestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          numero: 1,
          horaSolicitud: currentDate.format(DATE_TIME_FORMAT),
          domicilio: 'BBBBBB',
          telefono: 'BBBBBB',
          edad: 1,
          motivoLlamado: 'BBBBBB',
          seEfectuo: true,
          internacion: true,
          observaciones: 'BBBBBB',
          individuoAdhoc: 'BBBBBB',
          precioReal: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          horaSolicitud: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a SolicitudPrestacion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSolicitudPrestacionToCollectionIfMissing', () => {
      it('should add a SolicitudPrestacion to an empty array', () => {
        const solicitudPrestacion: ISolicitudPrestacion = { id: 123 };
        expectedResult = service.addSolicitudPrestacionToCollectionIfMissing([], solicitudPrestacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(solicitudPrestacion);
      });

      it('should not add a SolicitudPrestacion to an array that contains it', () => {
        const solicitudPrestacion: ISolicitudPrestacion = { id: 123 };
        const solicitudPrestacionCollection: ISolicitudPrestacion[] = [
          {
            ...solicitudPrestacion,
          },
          { id: 456 },
        ];
        expectedResult = service.addSolicitudPrestacionToCollectionIfMissing(solicitudPrestacionCollection, solicitudPrestacion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SolicitudPrestacion to an array that doesn't contain it", () => {
        const solicitudPrestacion: ISolicitudPrestacion = { id: 123 };
        const solicitudPrestacionCollection: ISolicitudPrestacion[] = [{ id: 456 }];
        expectedResult = service.addSolicitudPrestacionToCollectionIfMissing(solicitudPrestacionCollection, solicitudPrestacion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(solicitudPrestacion);
      });

      it('should add only unique SolicitudPrestacion to an array', () => {
        const solicitudPrestacionArray: ISolicitudPrestacion[] = [{ id: 123 }, { id: 456 }, { id: 50320 }];
        const solicitudPrestacionCollection: ISolicitudPrestacion[] = [{ id: 123 }];
        expectedResult = service.addSolicitudPrestacionToCollectionIfMissing(solicitudPrestacionCollection, ...solicitudPrestacionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const solicitudPrestacion: ISolicitudPrestacion = { id: 123 };
        const solicitudPrestacion2: ISolicitudPrestacion = { id: 456 };
        expectedResult = service.addSolicitudPrestacionToCollectionIfMissing([], solicitudPrestacion, solicitudPrestacion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(solicitudPrestacion);
        expect(expectedResult).toContain(solicitudPrestacion2);
      });

      it('should accept null and undefined values', () => {
        const solicitudPrestacion: ISolicitudPrestacion = { id: 123 };
        expectedResult = service.addSolicitudPrestacionToCollectionIfMissing([], null, solicitudPrestacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(solicitudPrestacion);
      });

      it('should return initial array if no SolicitudPrestacion is added', () => {
        const solicitudPrestacionCollection: ISolicitudPrestacion[] = [{ id: 123 }];
        expectedResult = service.addSolicitudPrestacionToCollectionIfMissing(solicitudPrestacionCollection, undefined, null);
        expect(expectedResult).toEqual(solicitudPrestacionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
