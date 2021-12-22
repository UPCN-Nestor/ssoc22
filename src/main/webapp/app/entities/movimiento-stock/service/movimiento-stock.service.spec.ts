import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMovimientoStock, MovimientoStock } from '../movimiento-stock.model';

import { MovimientoStockService } from './movimiento-stock.service';

describe('MovimientoStock Service', () => {
  let service: MovimientoStockService;
  let httpMock: HttpTestingController;
  let elemDefault: IMovimientoStock;
  let expectedResult: IMovimientoStock | IMovimientoStock[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MovimientoStockService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      fecha: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a MovimientoStock', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.create(new MovimientoStock()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MovimientoStock', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MovimientoStock', () => {
      const patchObject = Object.assign(
        {
          fecha: currentDate.format(DATE_FORMAT),
        },
        new MovimientoStock()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MovimientoStock', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a MovimientoStock', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMovimientoStockToCollectionIfMissing', () => {
      it('should add a MovimientoStock to an empty array', () => {
        const movimientoStock: IMovimientoStock = { id: 123 };
        expectedResult = service.addMovimientoStockToCollectionIfMissing([], movimientoStock);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(movimientoStock);
      });

      it('should not add a MovimientoStock to an array that contains it', () => {
        const movimientoStock: IMovimientoStock = { id: 123 };
        const movimientoStockCollection: IMovimientoStock[] = [
          {
            ...movimientoStock,
          },
          { id: 456 },
        ];
        expectedResult = service.addMovimientoStockToCollectionIfMissing(movimientoStockCollection, movimientoStock);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MovimientoStock to an array that doesn't contain it", () => {
        const movimientoStock: IMovimientoStock = { id: 123 };
        const movimientoStockCollection: IMovimientoStock[] = [{ id: 456 }];
        expectedResult = service.addMovimientoStockToCollectionIfMissing(movimientoStockCollection, movimientoStock);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(movimientoStock);
      });

      it('should add only unique MovimientoStock to an array', () => {
        const movimientoStockArray: IMovimientoStock[] = [{ id: 123 }, { id: 456 }, { id: 31295 }];
        const movimientoStockCollection: IMovimientoStock[] = [{ id: 123 }];
        expectedResult = service.addMovimientoStockToCollectionIfMissing(movimientoStockCollection, ...movimientoStockArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const movimientoStock: IMovimientoStock = { id: 123 };
        const movimientoStock2: IMovimientoStock = { id: 456 };
        expectedResult = service.addMovimientoStockToCollectionIfMissing([], movimientoStock, movimientoStock2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(movimientoStock);
        expect(expectedResult).toContain(movimientoStock2);
      });

      it('should accept null and undefined values', () => {
        const movimientoStock: IMovimientoStock = { id: 123 };
        expectedResult = service.addMovimientoStockToCollectionIfMissing([], null, movimientoStock, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(movimientoStock);
      });

      it('should return initial array if no MovimientoStock is added', () => {
        const movimientoStockCollection: IMovimientoStock[] = [{ id: 123 }];
        expectedResult = service.addMovimientoStockToCollectionIfMissing(movimientoStockCollection, undefined, null);
        expect(expectedResult).toEqual(movimientoStockCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
