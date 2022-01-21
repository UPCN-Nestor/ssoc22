import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IItemFactura, ItemFactura } from '../item-factura.model';

import { ItemFacturaService } from './item-factura.service';

describe('ItemFactura Service', () => {
  let service: ItemFacturaService;
  let httpMock: HttpTestingController;
  let elemDefault: IItemFactura;
  let expectedResult: IItemFactura | IItemFactura[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItemFacturaService);
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

    it('should create a ItemFactura', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ItemFactura()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItemFactura', () => {
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

    it('should partial update a ItemFactura', () => {
      const patchObject = Object.assign({}, new ItemFactura());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItemFactura', () => {
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

    it('should delete a ItemFactura', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addItemFacturaToCollectionIfMissing', () => {
      it('should add a ItemFactura to an empty array', () => {
        const itemFactura: IItemFactura = { id: 123 };
        expectedResult = service.addItemFacturaToCollectionIfMissing([], itemFactura);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemFactura);
      });

      it('should not add a ItemFactura to an array that contains it', () => {
        const itemFactura: IItemFactura = { id: 123 };
        const itemFacturaCollection: IItemFactura[] = [
          {
            ...itemFactura,
          },
          { id: 456 },
        ];
        expectedResult = service.addItemFacturaToCollectionIfMissing(itemFacturaCollection, itemFactura);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItemFactura to an array that doesn't contain it", () => {
        const itemFactura: IItemFactura = { id: 123 };
        const itemFacturaCollection: IItemFactura[] = [{ id: 456 }];
        expectedResult = service.addItemFacturaToCollectionIfMissing(itemFacturaCollection, itemFactura);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemFactura);
      });

      it('should add only unique ItemFactura to an array', () => {
        const itemFacturaArray: IItemFactura[] = [{ id: 123 }, { id: 456 }, { id: 21715 }];
        const itemFacturaCollection: IItemFactura[] = [{ id: 123 }];
        expectedResult = service.addItemFacturaToCollectionIfMissing(itemFacturaCollection, ...itemFacturaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itemFactura: IItemFactura = { id: 123 };
        const itemFactura2: IItemFactura = { id: 456 };
        expectedResult = service.addItemFacturaToCollectionIfMissing([], itemFactura, itemFactura2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemFactura);
        expect(expectedResult).toContain(itemFactura2);
      });

      it('should accept null and undefined values', () => {
        const itemFactura: IItemFactura = { id: 123 };
        expectedResult = service.addItemFacturaToCollectionIfMissing([], null, itemFactura, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemFactura);
      });

      it('should return initial array if no ItemFactura is added', () => {
        const itemFacturaCollection: IItemFactura[] = [{ id: 123 }];
        expectedResult = service.addItemFacturaToCollectionIfMissing(itemFacturaCollection, undefined, null);
        expect(expectedResult).toEqual(itemFacturaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
