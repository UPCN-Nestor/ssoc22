import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDespacho, Despacho } from '../despacho.model';

import { DespachoService } from './despacho.service';

describe('Despacho Service', () => {
  let service: DespachoService;
  let httpMock: HttpTestingController;
  let elemDefault: IDespacho;
  let expectedResult: IDespacho | IDespacho[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DespachoService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      horaSalida: currentDate,
      horaLlegada: currentDate,
      horaLibre: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          horaSalida: currentDate.format(DATE_TIME_FORMAT),
          horaLlegada: currentDate.format(DATE_TIME_FORMAT),
          horaLibre: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Despacho', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          horaSalida: currentDate.format(DATE_TIME_FORMAT),
          horaLlegada: currentDate.format(DATE_TIME_FORMAT),
          horaLibre: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          horaSalida: currentDate,
          horaLlegada: currentDate,
          horaLibre: currentDate,
        },
        returnedFromService
      );

      service.create(new Despacho()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Despacho', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          horaSalida: currentDate.format(DATE_TIME_FORMAT),
          horaLlegada: currentDate.format(DATE_TIME_FORMAT),
          horaLibre: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          horaSalida: currentDate,
          horaLlegada: currentDate,
          horaLibre: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Despacho', () => {
      const patchObject = Object.assign(
        {
          horaLlegada: currentDate.format(DATE_TIME_FORMAT),
          horaLibre: currentDate.format(DATE_TIME_FORMAT),
        },
        new Despacho()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          horaSalida: currentDate,
          horaLlegada: currentDate,
          horaLibre: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Despacho', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          horaSalida: currentDate.format(DATE_TIME_FORMAT),
          horaLlegada: currentDate.format(DATE_TIME_FORMAT),
          horaLibre: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          horaSalida: currentDate,
          horaLlegada: currentDate,
          horaLibre: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Despacho', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDespachoToCollectionIfMissing', () => {
      it('should add a Despacho to an empty array', () => {
        const despacho: IDespacho = { id: 123 };
        expectedResult = service.addDespachoToCollectionIfMissing([], despacho);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(despacho);
      });

      it('should not add a Despacho to an array that contains it', () => {
        const despacho: IDespacho = { id: 123 };
        const despachoCollection: IDespacho[] = [
          {
            ...despacho,
          },
          { id: 456 },
        ];
        expectedResult = service.addDespachoToCollectionIfMissing(despachoCollection, despacho);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Despacho to an array that doesn't contain it", () => {
        const despacho: IDespacho = { id: 123 };
        const despachoCollection: IDespacho[] = [{ id: 456 }];
        expectedResult = service.addDespachoToCollectionIfMissing(despachoCollection, despacho);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(despacho);
      });

      it('should add only unique Despacho to an array', () => {
        const despachoArray: IDespacho[] = [{ id: 123 }, { id: 456 }, { id: 64883 }];
        const despachoCollection: IDespacho[] = [{ id: 123 }];
        expectedResult = service.addDespachoToCollectionIfMissing(despachoCollection, ...despachoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const despacho: IDespacho = { id: 123 };
        const despacho2: IDespacho = { id: 456 };
        expectedResult = service.addDespachoToCollectionIfMissing([], despacho, despacho2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(despacho);
        expect(expectedResult).toContain(despacho2);
      });

      it('should accept null and undefined values', () => {
        const despacho: IDespacho = { id: 123 };
        expectedResult = service.addDespachoToCollectionIfMissing([], null, despacho, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(despacho);
      });

      it('should return initial array if no Despacho is added', () => {
        const despachoCollection: IDespacho[] = [{ id: 123 }];
        expectedResult = service.addDespachoToCollectionIfMissing(despachoCollection, undefined, null);
        expect(expectedResult).toEqual(despachoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
