import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IItemNomenclador, ItemNomenclador } from '../item-nomenclador.model';

import { ItemNomencladorService } from './item-nomenclador.service';

describe('ItemNomenclador Service', () => {
  let service: ItemNomencladorService;
  let httpMock: HttpTestingController;
  let elemDefault: IItemNomenclador;
  let expectedResult: IItemNomenclador | IItemNomenclador[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItemNomencladorService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
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

    it('should create a ItemNomenclador', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ItemNomenclador()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItemNomenclador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
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

    it('should partial update a ItemNomenclador', () => {
      const patchObject = Object.assign(
        {
          carencia: 'BBBBBB',
        },
        new ItemNomenclador()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItemNomenclador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
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

    it('should delete a ItemNomenclador', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addItemNomencladorToCollectionIfMissing', () => {
      it('should add a ItemNomenclador to an empty array', () => {
        const itemNomenclador: IItemNomenclador = { id: 123 };
        expectedResult = service.addItemNomencladorToCollectionIfMissing([], itemNomenclador);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemNomenclador);
      });

      it('should not add a ItemNomenclador to an array that contains it', () => {
        const itemNomenclador: IItemNomenclador = { id: 123 };
        const itemNomencladorCollection: IItemNomenclador[] = [
          {
            ...itemNomenclador,
          },
          { id: 456 },
        ];
        expectedResult = service.addItemNomencladorToCollectionIfMissing(itemNomencladorCollection, itemNomenclador);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItemNomenclador to an array that doesn't contain it", () => {
        const itemNomenclador: IItemNomenclador = { id: 123 };
        const itemNomencladorCollection: IItemNomenclador[] = [{ id: 456 }];
        expectedResult = service.addItemNomencladorToCollectionIfMissing(itemNomencladorCollection, itemNomenclador);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemNomenclador);
      });

      it('should add only unique ItemNomenclador to an array', () => {
        const itemNomencladorArray: IItemNomenclador[] = [{ id: 123 }, { id: 456 }, { id: 82887 }];
        const itemNomencladorCollection: IItemNomenclador[] = [{ id: 123 }];
        expectedResult = service.addItemNomencladorToCollectionIfMissing(itemNomencladorCollection, ...itemNomencladorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itemNomenclador: IItemNomenclador = { id: 123 };
        const itemNomenclador2: IItemNomenclador = { id: 456 };
        expectedResult = service.addItemNomencladorToCollectionIfMissing([], itemNomenclador, itemNomenclador2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemNomenclador);
        expect(expectedResult).toContain(itemNomenclador2);
      });

      it('should accept null and undefined values', () => {
        const itemNomenclador: IItemNomenclador = { id: 123 };
        expectedResult = service.addItemNomencladorToCollectionIfMissing([], null, itemNomenclador, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemNomenclador);
      });

      it('should return initial array if no ItemNomenclador is added', () => {
        const itemNomencladorCollection: IItemNomenclador[] = [{ id: 123 }];
        expectedResult = service.addItemNomencladorToCollectionIfMissing(itemNomencladorCollection, undefined, null);
        expect(expectedResult).toEqual(itemNomencladorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
