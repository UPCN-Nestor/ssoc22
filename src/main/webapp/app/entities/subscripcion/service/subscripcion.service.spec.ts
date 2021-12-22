import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISubscripcion, Subscripcion } from '../subscripcion.model';

import { SubscripcionService } from './subscripcion.service';

describe('Subscripcion Service', () => {
  let service: SubscripcionService;
  let httpMock: HttpTestingController;
  let elemDefault: ISubscripcion;
  let expectedResult: ISubscripcion | ISubscripcion[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SubscripcionService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      fechaAlta: currentDate,
      particularidades: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaAlta: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Subscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaAlta: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaAlta: currentDate,
        },
        returnedFromService
      );

      service.create(new Subscripcion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Subscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fechaAlta: currentDate.format(DATE_FORMAT),
          particularidades: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaAlta: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Subscripcion', () => {
      const patchObject = Object.assign(
        {
          fechaAlta: currentDate.format(DATE_FORMAT),
        },
        new Subscripcion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaAlta: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Subscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fechaAlta: currentDate.format(DATE_FORMAT),
          particularidades: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaAlta: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Subscripcion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSubscripcionToCollectionIfMissing', () => {
      it('should add a Subscripcion to an empty array', () => {
        const subscripcion: ISubscripcion = { id: 123 };
        expectedResult = service.addSubscripcionToCollectionIfMissing([], subscripcion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subscripcion);
      });

      it('should not add a Subscripcion to an array that contains it', () => {
        const subscripcion: ISubscripcion = { id: 123 };
        const subscripcionCollection: ISubscripcion[] = [
          {
            ...subscripcion,
          },
          { id: 456 },
        ];
        expectedResult = service.addSubscripcionToCollectionIfMissing(subscripcionCollection, subscripcion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Subscripcion to an array that doesn't contain it", () => {
        const subscripcion: ISubscripcion = { id: 123 };
        const subscripcionCollection: ISubscripcion[] = [{ id: 456 }];
        expectedResult = service.addSubscripcionToCollectionIfMissing(subscripcionCollection, subscripcion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subscripcion);
      });

      it('should add only unique Subscripcion to an array', () => {
        const subscripcionArray: ISubscripcion[] = [{ id: 123 }, { id: 456 }, { id: 65219 }];
        const subscripcionCollection: ISubscripcion[] = [{ id: 123 }];
        expectedResult = service.addSubscripcionToCollectionIfMissing(subscripcionCollection, ...subscripcionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const subscripcion: ISubscripcion = { id: 123 };
        const subscripcion2: ISubscripcion = { id: 456 };
        expectedResult = service.addSubscripcionToCollectionIfMissing([], subscripcion, subscripcion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subscripcion);
        expect(expectedResult).toContain(subscripcion2);
      });

      it('should accept null and undefined values', () => {
        const subscripcion: ISubscripcion = { id: 123 };
        expectedResult = service.addSubscripcionToCollectionIfMissing([], null, subscripcion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subscripcion);
      });

      it('should return initial array if no Subscripcion is added', () => {
        const subscripcionCollection: ISubscripcion[] = [{ id: 123 }];
        expectedResult = service.addSubscripcionToCollectionIfMissing(subscripcionCollection, undefined, null);
        expect(expectedResult).toEqual(subscripcionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
