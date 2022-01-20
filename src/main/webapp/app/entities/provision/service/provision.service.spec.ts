import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProvision, Provision } from '../provision.model';

import { ProvisionService } from './provision.service';

describe('Provision Service', () => {
  let service: ProvisionService;
  let httpMock: HttpTestingController;
  let elemDefault: IProvision;
  let expectedResult: IProvision | IProvision[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProvisionService);
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

    it('should create a Provision', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Provision()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Provision', () => {
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

    it('should partial update a Provision', () => {
      const patchObject = Object.assign({}, new Provision());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Provision', () => {
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

    it('should delete a Provision', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProvisionToCollectionIfMissing', () => {
      it('should add a Provision to an empty array', () => {
        const provision: IProvision = { id: 123 };
        expectedResult = service.addProvisionToCollectionIfMissing([], provision);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(provision);
      });

      it('should not add a Provision to an array that contains it', () => {
        const provision: IProvision = { id: 123 };
        const provisionCollection: IProvision[] = [
          {
            ...provision,
          },
          { id: 456 },
        ];
        expectedResult = service.addProvisionToCollectionIfMissing(provisionCollection, provision);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Provision to an array that doesn't contain it", () => {
        const provision: IProvision = { id: 123 };
        const provisionCollection: IProvision[] = [{ id: 456 }];
        expectedResult = service.addProvisionToCollectionIfMissing(provisionCollection, provision);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(provision);
      });

      it('should add only unique Provision to an array', () => {
        const provisionArray: IProvision[] = [{ id: 123 }, { id: 456 }, { id: 84940 }];
        const provisionCollection: IProvision[] = [{ id: 123 }];
        expectedResult = service.addProvisionToCollectionIfMissing(provisionCollection, ...provisionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const provision: IProvision = { id: 123 };
        const provision2: IProvision = { id: 456 };
        expectedResult = service.addProvisionToCollectionIfMissing([], provision, provision2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(provision);
        expect(expectedResult).toContain(provision2);
      });

      it('should accept null and undefined values', () => {
        const provision: IProvision = { id: 123 };
        expectedResult = service.addProvisionToCollectionIfMissing([], null, provision, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(provision);
      });

      it('should return initial array if no Provision is added', () => {
        const provisionCollection: IProvision[] = [{ id: 123 }];
        expectedResult = service.addProvisionToCollectionIfMissing(provisionCollection, undefined, null);
        expect(expectedResult).toEqual(provisionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
