import { IdentityVerificationService } from './identity-verification.service';
import type { IdentityMatchQuality } from './identity-verification.types';

type ServiceInternals = {
  matchIdNumber(text: string, expectedId: string): IdentityMatchQuality;
  matchBirthDate(text: string, birthDate: string): IdentityMatchQuality;
};

describe('IdentityVerificationService', () => {
  let service: IdentityVerificationService;
  let internals: ServiceInternals;

  beforeEach(() => {
    service = new IdentityVerificationService();
    internals = service as unknown as ServiceInternals;
  });

  describe('cruce del número de identidad', () => {
    it('acepta el número tal como aparece en la cédula, con puntos', () => {
      expect(
        internals.matchIdNumber('NUMERO 1.083.918.629', '1083918629'),
      ).toBe('exact');
    });

    it('acepta letras que el OCR confunde con dígitos', () => {
      // S->5, O->0, B->8, I->1 son las confusiones más frecuentes.
      expect(internals.matchIdNumber('NUMERO 1OB3918G29', '1083918629')).toBe(
        'fuzzy',
      );
    });

    it('tolera un único carácter mal leído', () => {
      expect(internals.matchIdNumber('NUMERO 1083918624', '1083918629')).toBe(
        'fuzzy',
      );
    });

    it('tolera un carácter de más intercalado', () => {
      expect(internals.matchIdNumber('NUMERO 10839186229', '1083918629')).toBe(
        'fuzzy',
      );
    });

    it('rechaza cuando fallan dos caracteres', () => {
      expect(internals.matchIdNumber('NUMERO 1083918444', '1083918629')).toBe(
        'none',
      );
    });

    it('rechaza el número de otra persona', () => {
      expect(
        internals.matchIdNumber('NUMERO 1.083.918.629', '1020304050'),
      ).toBe('none');
    });

    it('no intenta cruzar números demasiado cortos', () => {
      expect(internals.matchIdNumber('1234 5678', '1234')).toBe('none');
    });

    it('ignora acentos y saltos de línea del OCR', () => {
      expect(
        internals.matchIdNumber('NÚMERO\n1 083 918\n629\n', '1083918629'),
      ).toBe('exact');
    });
  });

  describe('cruce de la fecha de nacimiento', () => {
    it('reconoce el formato con mes abreviado de la cédula', () => {
      expect(
        internals.matchBirthDate(
          'FECHA DE NACIMIENTO 05-DIC-1996',
          '1996-12-05',
        ),
      ).toBe('exact');
    });

    it('reconoce el mes escrito completo', () => {
      expect(
        internals.matchBirthDate('NACIDO EL 05 DICIEMBRE 1996', '1996-12-05'),
      ).toBe('exact');
    });

    it('reconoce el formato numérico', () => {
      expect(internals.matchBirthDate('05/12/1996', '1996-12-05')).toBe(
        'exact',
      );
    });

    it('rechaza una fecha distinta', () => {
      expect(internals.matchBirthDate('05-DIC-1996', '1990-01-01')).toBe(
        'none',
      );
    });
  });

  describe('resultado frente a fotos inservibles', () => {
    it('no lanza y pide revisión manual cuando la imagen no es legible', async () => {
      const blank = {
        buffer: Buffer.from('no soy una imagen'),
        mimetype: 'image/png',
      };

      const result = await service.verify(
        blank,
        blank,
        '1083918629',
        '1996-12-05',
      );

      expect(result.outcome).toBe('unreadable');
      expect(result.verified).toBe(false);
      expect(result.requiresManualReview).toBe(true);
    });
  });

  afterEach(async () => {
    await service.onModuleDestroy();
  });
});
