import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInsumo, Insumo } from '../insumo.model';

import { InsumoService } from './insumo.service';

describe('Insumo Service', () => {
  let service: InsumoService;
  let httpMock: HttpTestingController;
  let elemDefault: IInsumo;
  let expectedResult: IInsumo | IInsumo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InsumoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      tipo: 'AAAAAAA',
      precioVenta: 0,
      esModificable: false,
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

    it('should create a Insumo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Insumo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Insumo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          precioVenta: 1,
          esModificable: true,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Insumo', () => {
      const patchObject = Object.assign(
        {
          precioVenta: 1,
          esModificable: true,
        },
        new Insumo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Insumo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          precioVenta: 1,
          esModificable: true,
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

    it('should delete a Insumo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInsumoToCollectionIfMissing', () => {
      it('should add a Insumo to an empty array', () => {
        const insumo: IInsumo = { id: 123 };
        expectedResult = service.addInsumoToCollectionIfMissing([], insumo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(insumo);
      });

      it('should not add a Insumo to an array that contains it', () => {
        const insumo: IInsumo = { id: 123 };
        const insumoCollection: IInsumo[] = [
          {
            ...insumo,
          },
          { id: 456 },
        ];
        expectedResult = service.addInsumoToCollectionIfMissing(insumoCollection, insumo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Insumo to an array that doesn't contain it", () => {
        const insumo: IInsumo = { id: 123 };
        const insumoCollection: IInsumo[] = [{ id: 456 }];
        expectedResult = service.addInsumoToCollectionIfMissing(insumoCollection, insumo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(insumo);
      });

      it('should add only unique Insumo to an array', () => {
        const insumoArray: IInsumo[] = [{ id: 123 }, { id: 456 }, { id: 42482 }];
        const insumoCollection: IInsumo[] = [{ id: 123 }];
        expectedResult = service.addInsumoToCollectionIfMissing(insumoCollection, ...insumoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const insumo: IInsumo = { id: 123 };
        const insumo2: IInsumo = { id: 456 };
        expectedResult = service.addInsumoToCollectionIfMissing([], insumo, insumo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(insumo);
        expect(expectedResult).toContain(insumo2);
      });

      it('should accept null and undefined values', () => {
        const insumo: IInsumo = { id: 123 };
        expectedResult = service.addInsumoToCollectionIfMissing([], null, insumo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(insumo);
      });

      it('should return initial array if no Insumo is added', () => {
        const insumoCollection: IInsumo[] = [{ id: 123 }];
        expectedResult = service.addInsumoToCollectionIfMissing(insumoCollection, undefined, null);
        expect(expectedResult).toEqual(insumoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
