import { ValidationPipe } from '@nestjs/common';
import { CreateAssociationDto } from './create-association.dto';

const pipe = new ValidationPipe({
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
});

const metadata = {
  type: 'body' as const,
  metatype: CreateAssociationDto,
};

const basePayload = {
  name: 'Liga Distrital de Fútbol',
  description: 'Organización deportiva regional.',
  city: 'Pitalito',
  address: 'Pitalito, Huila',
  phone: '+57 320 2137248',
  ownerUserId: '7',
  status: 'active',
};

const transform = (payload: Record<string, unknown>) =>
  pipe.transform(payload, metadata) as Promise<CreateAssociationDto>;

describe('CreateAssociationDto', () => {
  it('acepta una asociación sin NIT ni correo electrónico', async () => {
    const result = await transform(basePayload);

    expect(result.taxId).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.name).toBe('Liga Distrital de Fútbol');
  });

  it('convierte en nulo el correo vacío que envía el formulario', async () => {
    // Un input HTML vacío llega como cadena, no como ausencia de campo.
    const result = await transform({ ...basePayload, email: '   ' });

    expect(result.email).toBeNull();
  });

  it('convierte en nulo el NIT vacío para no chocar con el índice único', async () => {
    const result = await transform({ ...basePayload, taxId: '' });

    expect(result.taxId).toBeNull();
  });

  it('sigue aceptando NIT y correo cuando se envían', async () => {
    const result = await transform({
      ...basePayload,
      taxId: ' 900123456-7 ',
      email: ' Contacto@Liga.example ',
    });

    expect(result.taxId).toBe('900123456-7');
    expect(result.email).toBe('Contacto@Liga.example');
  });

  it('rechaza un correo con formato inválido', async () => {
    await expect(
      transform({ ...basePayload, email: 'no-es-un-correo' }),
    ).rejects.toThrow();
  });

  it('sigue exigiendo los campos obligatorios', async () => {
    const { city: _city, ...withoutCity } = basePayload;

    await expect(transform(withoutCity)).rejects.toThrow();
  });
});
