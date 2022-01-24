import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChofer, Chofer } from '../chofer.model';

import { ChoferService } from './chofer.service';

describe('Chofer Service', () => {
  let service: ChoferService;
  let httpMock: HttpTestingController;
  let elemDefault: IChofer;
  let expectedResult: IChofer | IChofer[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChoferService);
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

    it('should create a Chofer', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Chofer()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Chofer', () => {
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

    it('should partial update a Chofer', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
        },
        new Chofer()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Chofer', () => {
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

    it('should delete a Chofer', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addChoferToCollectionIfMissing', () => {
      it('should add a Chofer to an empty array', () => {
        const chofer: IChofer = { id: 123 };
        expectedResult = service.addChoferToCollectionIfMissing([], chofer);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chofer);
      });

      it('should not add a Chofer to an array that contains it', () => {
        const chofer: IChofer = { id: 123 };
        const choferCollection: IChofer[] = [
          {
            ...chofer,
          },
          { id: 456 },
        ];
        expectedResult = service.addChoferToCollectionIfMissing(choferCollection, chofer);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Chofer to an array that doesn't contain it", () => {
        const chofer: IChofer = { id: 123 };
        const choferCollection: IChofer[] = [{ id: 456 }];
        expectedResult = service.addChoferToCollectionIfMissing(choferCollection, chofer);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chofer);
      });

      it('should add only unique Chofer to an array', () => {
        const choferArray: IChofer[] = [{ id: 123 }, { id: 456 }, { id: 62038 }];
        const choferCollection: IChofer[] = [{ id: 123 }];
        expectedResult = service.addChoferToCollectionIfMissing(choferCollection, ...choferArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chofer: IChofer = { id: 123 };
        const chofer2: IChofer = { id: 456 };
        expectedResult = service.addChoferToCollectionIfMissing([], chofer, chofer2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chofer);
        expect(expectedResult).toContain(chofer2);
      });

      it('should accept null and undefined values', () => {
        const chofer: IChofer = { id: 123 };
        expectedResult = service.addChoferToCollectionIfMissing([], null, chofer, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chofer);
      });

      it('should return initial array if no Chofer is added', () => {
        const choferCollection: IChofer[] = [{ id: 123 }];
        expectedResult = service.addChoferToCollectionIfMissing(choferCollection, undefined, null);
        expect(expectedResult).toEqual(choferCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
