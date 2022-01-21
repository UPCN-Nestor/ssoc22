import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEquipo, Equipo } from '../equipo.model';

import { EquipoService } from './equipo.service';

describe('Equipo Service', () => {
  let service: EquipoService;
  let httpMock: HttpTestingController;
  let elemDefault: IEquipo;
  let expectedResult: IEquipo | IEquipo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EquipoService);
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

    it('should create a Equipo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Equipo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Equipo', () => {
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

    it('should partial update a Equipo', () => {
      const patchObject = Object.assign({}, new Equipo());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Equipo', () => {
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

    it('should delete a Equipo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEquipoToCollectionIfMissing', () => {
      it('should add a Equipo to an empty array', () => {
        const equipo: IEquipo = { id: 123 };
        expectedResult = service.addEquipoToCollectionIfMissing([], equipo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(equipo);
      });

      it('should not add a Equipo to an array that contains it', () => {
        const equipo: IEquipo = { id: 123 };
        const equipoCollection: IEquipo[] = [
          {
            ...equipo,
          },
          { id: 456 },
        ];
        expectedResult = service.addEquipoToCollectionIfMissing(equipoCollection, equipo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Equipo to an array that doesn't contain it", () => {
        const equipo: IEquipo = { id: 123 };
        const equipoCollection: IEquipo[] = [{ id: 456 }];
        expectedResult = service.addEquipoToCollectionIfMissing(equipoCollection, equipo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(equipo);
      });

      it('should add only unique Equipo to an array', () => {
        const equipoArray: IEquipo[] = [{ id: 123 }, { id: 456 }, { id: 66840 }];
        const equipoCollection: IEquipo[] = [{ id: 123 }];
        expectedResult = service.addEquipoToCollectionIfMissing(equipoCollection, ...equipoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const equipo: IEquipo = { id: 123 };
        const equipo2: IEquipo = { id: 456 };
        expectedResult = service.addEquipoToCollectionIfMissing([], equipo, equipo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(equipo);
        expect(expectedResult).toContain(equipo2);
      });

      it('should accept null and undefined values', () => {
        const equipo: IEquipo = { id: 123 };
        expectedResult = service.addEquipoToCollectionIfMissing([], null, equipo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(equipo);
      });

      it('should return initial array if no Equipo is added', () => {
        const equipoCollection: IEquipo[] = [{ id: 123 }];
        expectedResult = service.addEquipoToCollectionIfMissing(equipoCollection, undefined, null);
        expect(expectedResult).toEqual(equipoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
