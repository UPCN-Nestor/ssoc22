import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMovil, Movil } from '../movil.model';

import { MovilService } from './movil.service';

describe('Movil Service', () => {
  let service: MovilService;
  let httpMock: HttpTestingController;
  let elemDefault: IMovil;
  let expectedResult: IMovil | IMovil[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MovilService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      numero: 0,
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

    it('should create a Movil', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Movil()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Movil', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numero: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Movil', () => {
      const patchObject = Object.assign({}, new Movil());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Movil', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numero: 1,
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

    it('should delete a Movil', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMovilToCollectionIfMissing', () => {
      it('should add a Movil to an empty array', () => {
        const movil: IMovil = { id: 123 };
        expectedResult = service.addMovilToCollectionIfMissing([], movil);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(movil);
      });

      it('should not add a Movil to an array that contains it', () => {
        const movil: IMovil = { id: 123 };
        const movilCollection: IMovil[] = [
          {
            ...movil,
          },
          { id: 456 },
        ];
        expectedResult = service.addMovilToCollectionIfMissing(movilCollection, movil);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Movil to an array that doesn't contain it", () => {
        const movil: IMovil = { id: 123 };
        const movilCollection: IMovil[] = [{ id: 456 }];
        expectedResult = service.addMovilToCollectionIfMissing(movilCollection, movil);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(movil);
      });

      it('should add only unique Movil to an array', () => {
        const movilArray: IMovil[] = [{ id: 123 }, { id: 456 }, { id: 66552 }];
        const movilCollection: IMovil[] = [{ id: 123 }];
        expectedResult = service.addMovilToCollectionIfMissing(movilCollection, ...movilArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const movil: IMovil = { id: 123 };
        const movil2: IMovil = { id: 456 };
        expectedResult = service.addMovilToCollectionIfMissing([], movil, movil2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(movil);
        expect(expectedResult).toContain(movil2);
      });

      it('should accept null and undefined values', () => {
        const movil: IMovil = { id: 123 };
        expectedResult = service.addMovilToCollectionIfMissing([], null, movil, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(movil);
      });

      it('should return initial array if no Movil is added', () => {
        const movilCollection: IMovil[] = [{ id: 123 }];
        expectedResult = service.addMovilToCollectionIfMissing(movilCollection, undefined, null);
        expect(expectedResult).toEqual(movilCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
