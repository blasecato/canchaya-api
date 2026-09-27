import { IdentityVerificationService } from './identity-verification.service';
import type { IdentityMatchQuality } from './identity-verification.types';

type ServiceInternals = {
  getWorker(): Promise<{ recognize: jest.Mock }>;
  normalizeForOcr(buffer: Buffer): Promise<Buffer>;
  applyRotation(buffer: Buffer, rotation: number): Promise<Buffer>;
  readDocument(): Promise<{
    text: string;
    sides: string[];
    characters: number;
    confidence: number;
    rotationDegrees: number;
  }>;
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

    it('no confirma letras que podrían confundirse con dígitos', () => {
      // S->5, O->0, B->8, I->1 son las confusiones más frecuentes.
      expect(internals.matchIdNumber('NUMERO 1OB3918G29', '1083918629')).toBe(
        'none',
      );
    });

    it('rechaza un único dígito diferente', () => {
      expect(internals.matchIdNumber('NUMERO 1083918624', '1083918629')).toBe(
        'none',
      );
    });

    it('rechaza un dígito de más', () => {
      expect(internals.matchIdNumber('NUMERO 10839186229', '1083918629')).toBe(
        'none',
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

    it('no construye números concatenando líneas distintas', () => {
      expect(
        internals.matchIdNumber('NÚMERO\n1 083 918\n629\n', '1083918629'),
      ).toBe('none');
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

  describe('verificación obligatoria de ambas caras y todos los datos', () => {
    const file = { buffer: Buffer.from('fixture'), mimetype: 'image/png' };
    const front =
      'REPUBLICA DE COLOMBIA CEDULA DE CIUDADANIA\nNUMERO 1.083.918.629\nAPELLIDOS PEREZ\nNOMBRES JUAN';
    const back =
      'FECHA DE NACIMIENTO 05-DIC-1996\nFECHA DE EXPEDICION 10-ENE-2015';

    it('descarta lecturas de baja confianza aunque parezcan coincidir', async () => {
      jest.spyOn(internals, 'getWorker').mockResolvedValue({
        recognize: jest.fn().mockResolvedValue({
          data: { text: front + '\n' + back, confidence: 10 },
        }),
      });
      jest.spyOn(internals, 'normalizeForOcr').mockResolvedValue(file.buffer);
      jest.spyOn(internals, 'applyRotation').mockResolvedValue(file.buffer);
      const result = await service.verify(
        file,
        file,
        '1083918629',
        '1996-12-05',
        'Juan Pérez',
      );
      expect(result.verified).toBe(false);
      expect(result.details.failureReason).toBe('insufficient_text');
    });

    function mockReading(sides: string[]) {
      jest.spyOn(internals, 'readDocument').mockResolvedValue({
        sides,
        text: sides.join('\n'),
        characters: sides.join('').length,
        confidence: 90,
        rotationDegrees: 0,
      });
    }

    it('verifica una cédula legible con todos los datos coincidentes', async () => {
      mockReading([front, back]);
      expect(
        (
          await service.verify(
            file,
            file,
            '1083918629',
            '1996-12-05',
            'Juan Pérez',
          )
        ).verified,
      ).toBe(true);
    });

    it.each([
      ['1083918624', '1996-12-05', 'Juan Pérez'],
      ['1083918629', '1990-01-01', 'Juan Pérez'],
      ['1083918629', '1996-12-05', 'Pedro Pérez'],
    ])('rechaza datos diferentes: %s, %s, %s', async (id, date, name) => {
      mockReading([front, back]);
      expect((await service.verify(file, file, id, date, name)).verified).toBe(
        false,
      );
    });

    it('rechaza una cara ilegible aunque la otra contenga todos los datos', async () => {
      mockReading([front + back, '']);
      expect(
        (
          await service.verify(
            file,
            file,
            '1083918629',
            '1996-12-05',
            'Juan Pérez',
          )
        ).outcome,
      ).toBe('unreadable');
    });

    it('rechaza texto ajeno al documento aunque incluya los datos', async () => {
      mockReading([
        'Juan Perez 1083918629 05-DIC-1996',
        'Invitacion a un torneo de futbol',
      ]);
      expect(
        (
          await service.verify(
            file,
            file,
            '1083918629',
            '1996-12-05',
            'Juan Pérez',
          )
        ).details.failureReason,
      ).toBe('document_not_recognized');
    });
  });

  afterEach(async () => {
    await service.onModuleDestroy();
  });
});
