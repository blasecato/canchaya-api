import { validate } from 'class-validator';
import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { buildValidationException } from './validation-messages';

class FormularioDePrueba {
  @IsString()
  tournamentName!: string;

  @IsNumber()
  @Min(0)
  yellowCardFee!: number;

  @IsNotEmpty({ message: 'Escribe el motivo de la sanción.' })
  reason!: string;

  @IsIn(['male', 'female'])
  categoryGender!: string;
}

describe('Mensajes de validación', () => {
  const buildMessages = async (payload: Partial<FormularioDePrueba>) => {
    const form = Object.assign(new FormularioDePrueba(), payload);
    const errors = await validate(form);
    const response = buildValidationException(errors).getResponse() as {
      message: string[] | string;
    };
    return Array.isArray(response.message)
      ? response.message
      : [response.message];
  };

  it('traduce las validaciones genéricas al español', async () => {
    const messages = await buildMessages({ reason: 'Agresión' });

    expect(messages).toContain('El campo tournament name es obligatorio.');
    expect(messages).toContain('El campo yellow card fee debe ser un número.');
    expect(messages).toContain(
      'Selecciona una opción válida en category gender.',
    );
    expect(messages.join(' ')).not.toMatch(/must be|should not/i);
  });

  it('respeta los mensajes propios que ya escribió el DTO', async () => {
    const messages = await buildMessages({
      tournamentName: 'Copa',
      yellowCardFee: 0,
      categoryGender: 'male',
    });

    expect(messages).toEqual(['Escribe el motivo de la sanción.']);
  });

  it('avisa en español cuando el valor está por debajo del mínimo', async () => {
    const messages = await buildMessages({
      tournamentName: 'Copa',
      yellowCardFee: -5,
      reason: 'Motivo',
      categoryGender: 'male',
    });

    expect(messages).toEqual([
      'El valor de yellow card fee es demasiado bajo.',
    ]);
  });
});
