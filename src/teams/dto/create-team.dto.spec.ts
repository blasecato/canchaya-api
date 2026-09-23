import { ValidationPipe } from '@nestjs/common';
import { CreateTeamDto } from './create-team.dto';

const pipe = new ValidationPipe({
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
});

const metadata = { type: 'body' as const, metatype: CreateTeamDto };

const basePayload = {
  name: 'Barcelona de Pitalito',
  sportType: 'Fútbol',
  primaryColor: '#FFC400',
  secondaryColor: '#FFFFFF',
  captainUserId: '5',
  memberUserIds: '["5","8"]',
};

const transform = (payload: Record<string, unknown>) =>
  pipe.transform(payload, metadata) as Promise<CreateTeamDto>;

describe('CreateTeamDto', () => {
  it('acepta un equipo sin modalidad', async () => {
    // La modalidad la fija cada torneo, no el equipo.
    const result = await transform(basePayload);

    expect(result.modality).toBeUndefined();
    expect(result.name).toBe('Barcelona de Pitalito');
    expect(result.memberUserIds).toEqual(['5', '8']);
  });

  it('sigue aceptando la modalidad cuando se envía', async () => {
    const result = await transform({ ...basePayload, modality: 'Fútbol 7' });

    expect(result.modality).toBe('Fútbol 7');
  });

  it('rechaza una modalidad que no es de fútbol', async () => {
    await expect(
      transform({ ...basePayload, modality: 'Baloncesto' }),
    ).rejects.toThrow();
  });

  it('sigue exigiendo el nombre del equipo', async () => {
    const withoutName = { ...basePayload };
    delete (withoutName as Partial<typeof basePayload>).name;

    await expect(transform(withoutName)).rejects.toThrow();
  });
});
