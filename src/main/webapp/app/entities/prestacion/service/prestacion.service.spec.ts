import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPrestacion, Prestacion } from '../prestacion.model';

import { PrestacionService } from './prestacion.service';

describe('Prestacion Service', () => {
  let service: PrestacionService;
  let httpMock: HttpTestingController;
  let elemDefault: IPrestacion;
  let expectedResult: IPrestacion | IPrestacion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrestacionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      tipo: 'AAAAAAA',
      precio: 0,
      carencia: 'PT1S',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Prestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Prestacion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Prestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          precio: 1,
          carencia: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Prestacion', () => {
      const patchObject = Object.assign({}, new Prestacion());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Prestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          precio: 1,
          carencia: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Prestacion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPrestacionToCollectionIfMissing', () => {
      it('should add a Prestacion to an empty array', () => {
        const prestacion: IPrestacion = { id: 123 };
        expectedResult = service.addPrestacionToCollectionIfMissing([], prestacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prestacion);
      });

      it('should not add a Prestacion to an array that contains it', () => {
        const prestacion: IPrestacion = { id: 123 };
        const prestacionCollection: IPrestacion[] = [
          {
            ...prestacion,
          },
          { id: 456 },
        ];
        expectedResult = service.addPrestacionToCollectionIfMissing(prestacionCollection, prestacion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Prestacion to an array that doesn't contain it", () => {
        const prestacion: IPrestacion = { id: 123 };
        const prestacionCollection: IPrestacion[] = [{ id: 456 }];
        expectedResult = service.addPrestacionToCollectionIfMissing(prestacionCollection, prestacion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prestacion);
      });

      it('should add only unique Prestacion to an array', () => {
        const prestacionArray: IPrestacion[] = [{ id: 123 }, { id: 456 }, { id: 1859 }];
        const prestacionCollection: IPrestacion[] = [{ id: 123 }];
        expectedResult = service.addPrestacionToCollectionIfMissing(prestacionCollection, ...prestacionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const prestacion: IPrestacion = { id: 123 };
        const prestacion2: IPrestacion = { id: 456 };
        expectedResult = service.addPrestacionToCollectionIfMissing([], prestacion, prestacion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prestacion);
        expect(expectedResult).toContain(prestacion2);
      });

      it('should accept null and undefined values', () => {
        const prestacion: IPrestacion = { id: 123 };
        expectedResult = service.addPrestacionToCollectionIfMissing([], null, prestacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prestacion);
      });

      it('should return initial array if no Prestacion is added', () => {
        const prestacionCollection: IPrestacion[] = [{ id: 123 }];
        expectedResult = service.addPrestacionToCollectionIfMissing(prestacionCollection, undefined, null);
        expect(expectedResult).toEqual(prestacionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
