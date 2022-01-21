import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReglaPrestacion, ReglaPrestacion } from '../regla-prestacion.model';

import { ReglaPrestacionService } from './regla-prestacion.service';

describe('ReglaPrestacion Service', () => {
  let service: ReglaPrestacionService;
  let httpMock: HttpTestingController;
  let elemDefault: IReglaPrestacion;
  let expectedResult: IReglaPrestacion | IReglaPrestacion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReglaPrestacionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
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

    it('should create a ReglaPrestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ReglaPrestacion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReglaPrestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReglaPrestacion', () => {
      const patchObject = Object.assign({}, new ReglaPrestacion());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReglaPrestacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
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

    it('should delete a ReglaPrestacion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addReglaPrestacionToCollectionIfMissing', () => {
      it('should add a ReglaPrestacion to an empty array', () => {
        const reglaPrestacion: IReglaPrestacion = { id: 123 };
        expectedResult = service.addReglaPrestacionToCollectionIfMissing([], reglaPrestacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reglaPrestacion);
      });

      it('should not add a ReglaPrestacion to an array that contains it', () => {
        const reglaPrestacion: IReglaPrestacion = { id: 123 };
        const reglaPrestacionCollection: IReglaPrestacion[] = [
          {
            ...reglaPrestacion,
          },
          { id: 456 },
        ];
        expectedResult = service.addReglaPrestacionToCollectionIfMissing(reglaPrestacionCollection, reglaPrestacion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReglaPrestacion to an array that doesn't contain it", () => {
        const reglaPrestacion: IReglaPrestacion = { id: 123 };
        const reglaPrestacionCollection: IReglaPrestacion[] = [{ id: 456 }];
        expectedResult = service.addReglaPrestacionToCollectionIfMissing(reglaPrestacionCollection, reglaPrestacion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reglaPrestacion);
      });

      it('should add only unique ReglaPrestacion to an array', () => {
        const reglaPrestacionArray: IReglaPrestacion[] = [{ id: 123 }, { id: 456 }, { id: 45954 }];
        const reglaPrestacionCollection: IReglaPrestacion[] = [{ id: 123 }];
        expectedResult = service.addReglaPrestacionToCollectionIfMissing(reglaPrestacionCollection, ...reglaPrestacionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reglaPrestacion: IReglaPrestacion = { id: 123 };
        const reglaPrestacion2: IReglaPrestacion = { id: 456 };
        expectedResult = service.addReglaPrestacionToCollectionIfMissing([], reglaPrestacion, reglaPrestacion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reglaPrestacion);
        expect(expectedResult).toContain(reglaPrestacion2);
      });

      it('should accept null and undefined values', () => {
        const reglaPrestacion: IReglaPrestacion = { id: 123 };
        expectedResult = service.addReglaPrestacionToCollectionIfMissing([], null, reglaPrestacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reglaPrestacion);
      });

      it('should return initial array if no ReglaPrestacion is added', () => {
        const reglaPrestacionCollection: IReglaPrestacion[] = [{ id: 123 }];
        expectedResult = service.addReglaPrestacionToCollectionIfMissing(reglaPrestacionCollection, undefined, null);
        expect(expectedResult).toEqual(reglaPrestacionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
