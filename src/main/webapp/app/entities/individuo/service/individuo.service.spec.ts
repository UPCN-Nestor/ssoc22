import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IIndividuo, Individuo } from '../individuo.model';

import { IndividuoService } from './individuo.service';

describe('Individuo Service', () => {
  let service: IndividuoService;
  let httpMock: HttpTestingController;
  let elemDefault: IIndividuo;
  let expectedResult: IIndividuo | IIndividuo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IndividuoService);
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

    it('should create a Individuo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Individuo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Individuo', () => {
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

    it('should partial update a Individuo', () => {
      const patchObject = Object.assign({}, new Individuo());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Individuo', () => {
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

    it('should delete a Individuo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addIndividuoToCollectionIfMissing', () => {
      it('should add a Individuo to an empty array', () => {
        const individuo: IIndividuo = { id: 123 };
        expectedResult = service.addIndividuoToCollectionIfMissing([], individuo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(individuo);
      });

      it('should not add a Individuo to an array that contains it', () => {
        const individuo: IIndividuo = { id: 123 };
        const individuoCollection: IIndividuo[] = [
          {
            ...individuo,
          },
          { id: 456 },
        ];
        expectedResult = service.addIndividuoToCollectionIfMissing(individuoCollection, individuo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Individuo to an array that doesn't contain it", () => {
        const individuo: IIndividuo = { id: 123 };
        const individuoCollection: IIndividuo[] = [{ id: 456 }];
        expectedResult = service.addIndividuoToCollectionIfMissing(individuoCollection, individuo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(individuo);
      });

      it('should add only unique Individuo to an array', () => {
        const individuoArray: IIndividuo[] = [{ id: 123 }, { id: 456 }, { id: 5138 }];
        const individuoCollection: IIndividuo[] = [{ id: 123 }];
        expectedResult = service.addIndividuoToCollectionIfMissing(individuoCollection, ...individuoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const individuo: IIndividuo = { id: 123 };
        const individuo2: IIndividuo = { id: 456 };
        expectedResult = service.addIndividuoToCollectionIfMissing([], individuo, individuo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(individuo);
        expect(expectedResult).toContain(individuo2);
      });

      it('should accept null and undefined values', () => {
        const individuo: IIndividuo = { id: 123 };
        expectedResult = service.addIndividuoToCollectionIfMissing([], null, individuo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(individuo);
      });

      it('should return initial array if no Individuo is added', () => {
        const individuoCollection: IIndividuo[] = [{ id: 123 }];
        expectedResult = service.addIndividuoToCollectionIfMissing(individuoCollection, undefined, null);
        expect(expectedResult).toEqual(individuoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
