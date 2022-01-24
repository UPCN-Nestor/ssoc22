import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEnfermero, Enfermero } from '../enfermero.model';

import { EnfermeroService } from './enfermero.service';

describe('Enfermero Service', () => {
  let service: EnfermeroService;
  let httpMock: HttpTestingController;
  let elemDefault: IEnfermero;
  let expectedResult: IEnfermero | IEnfermero[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EnfermeroService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
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

    it('should create a Enfermero', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Enfermero()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Enfermero', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Enfermero', () => {
      const patchObject = Object.assign({}, new Enfermero());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Enfermero', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
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

    it('should delete a Enfermero', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEnfermeroToCollectionIfMissing', () => {
      it('should add a Enfermero to an empty array', () => {
        const enfermero: IEnfermero = { id: 123 };
        expectedResult = service.addEnfermeroToCollectionIfMissing([], enfermero);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(enfermero);
      });

      it('should not add a Enfermero to an array that contains it', () => {
        const enfermero: IEnfermero = { id: 123 };
        const enfermeroCollection: IEnfermero[] = [
          {
            ...enfermero,
          },
          { id: 456 },
        ];
        expectedResult = service.addEnfermeroToCollectionIfMissing(enfermeroCollection, enfermero);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Enfermero to an array that doesn't contain it", () => {
        const enfermero: IEnfermero = { id: 123 };
        const enfermeroCollection: IEnfermero[] = [{ id: 456 }];
        expectedResult = service.addEnfermeroToCollectionIfMissing(enfermeroCollection, enfermero);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(enfermero);
      });

      it('should add only unique Enfermero to an array', () => {
        const enfermeroArray: IEnfermero[] = [{ id: 123 }, { id: 456 }, { id: 21367 }];
        const enfermeroCollection: IEnfermero[] = [{ id: 123 }];
        expectedResult = service.addEnfermeroToCollectionIfMissing(enfermeroCollection, ...enfermeroArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const enfermero: IEnfermero = { id: 123 };
        const enfermero2: IEnfermero = { id: 456 };
        expectedResult = service.addEnfermeroToCollectionIfMissing([], enfermero, enfermero2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(enfermero);
        expect(expectedResult).toContain(enfermero2);
      });

      it('should accept null and undefined values', () => {
        const enfermero: IEnfermero = { id: 123 };
        expectedResult = service.addEnfermeroToCollectionIfMissing([], null, enfermero, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(enfermero);
      });

      it('should return initial array if no Enfermero is added', () => {
        const enfermeroCollection: IEnfermero[] = [{ id: 123 }];
        expectedResult = service.addEnfermeroToCollectionIfMissing(enfermeroCollection, undefined, null);
        expect(expectedResult).toEqual(enfermeroCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
