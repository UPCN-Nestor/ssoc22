import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPrestador, Prestador } from '../prestador.model';

import { PrestadorService } from './prestador.service';

describe('Prestador Service', () => {
  let service: PrestadorService;
  let httpMock: HttpTestingController;
  let elemDefault: IPrestador;
  let expectedResult: IPrestador | IPrestador[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrestadorService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      condicion: 'AAAAAAA',
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

    it('should create a Prestador', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Prestador()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Prestador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          condicion: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Prestador', () => {
      const patchObject = Object.assign(
        {
          condicion: 'BBBBBB',
        },
        new Prestador()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Prestador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          condicion: 'BBBBBB',
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

    it('should delete a Prestador', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPrestadorToCollectionIfMissing', () => {
      it('should add a Prestador to an empty array', () => {
        const prestador: IPrestador = { id: 123 };
        expectedResult = service.addPrestadorToCollectionIfMissing([], prestador);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prestador);
      });

      it('should not add a Prestador to an array that contains it', () => {
        const prestador: IPrestador = { id: 123 };
        const prestadorCollection: IPrestador[] = [
          {
            ...prestador,
          },
          { id: 456 },
        ];
        expectedResult = service.addPrestadorToCollectionIfMissing(prestadorCollection, prestador);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Prestador to an array that doesn't contain it", () => {
        const prestador: IPrestador = { id: 123 };
        const prestadorCollection: IPrestador[] = [{ id: 456 }];
        expectedResult = service.addPrestadorToCollectionIfMissing(prestadorCollection, prestador);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prestador);
      });

      it('should add only unique Prestador to an array', () => {
        const prestadorArray: IPrestador[] = [{ id: 123 }, { id: 456 }, { id: 57565 }];
        const prestadorCollection: IPrestador[] = [{ id: 123 }];
        expectedResult = service.addPrestadorToCollectionIfMissing(prestadorCollection, ...prestadorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const prestador: IPrestador = { id: 123 };
        const prestador2: IPrestador = { id: 456 };
        expectedResult = service.addPrestadorToCollectionIfMissing([], prestador, prestador2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prestador);
        expect(expectedResult).toContain(prestador2);
      });

      it('should accept null and undefined values', () => {
        const prestador: IPrestador = { id: 123 };
        expectedResult = service.addPrestadorToCollectionIfMissing([], null, prestador, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prestador);
      });

      it('should return initial array if no Prestador is added', () => {
        const prestadorCollection: IPrestador[] = [{ id: 123 }];
        expectedResult = service.addPrestadorToCollectionIfMissing(prestadorCollection, undefined, null);
        expect(expectedResult).toEqual(prestadorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
