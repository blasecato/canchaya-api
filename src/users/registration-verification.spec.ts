import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { IdentityVerificationService } from './identity-verification.service';
import { MailService } from '../mail/mail.service';
import { RegisterPlayerDto } from './dto/register-player.dto';

describe('Registro: el OCR clasifica, no bloquea', () => {
  const dto: RegisterPlayerDto = {
    idNumber: '1083918629',
    fullName: 'Juan Pérez',
    email: 'test@example.com',
    birthDate: '1996-01-01',
    age: new Date().getFullYear() - 1996,
    birthCity: 'Pitalito',
    gender: 'male',
    password: 'password123',
  };
  const file = { buffer: Buffer.from('fixture'), mimetype: 'image/png' };

  const buildService = (verifyResult: unknown) => {
    const usersCreate = jest.fn().mockResolvedValue({ id: 7n });
    const rolesCreate = jest.fn().mockResolvedValue({});
    const transaction = jest.fn(
      async (callback: (tx: unknown) => Promise<unknown>) =>
        callback({
          users: { create: usersCreate, findUniqueOrThrow: jest.fn() },
          user_roles: { create: rolesCreate },
        }),
    );
    const saveUserPhoto = jest
      .fn()
      .mockResolvedValue({ url: 'https://cdn/photo.png', publicId: 'photo' });
    const saveIdentityDocument = jest.fn().mockResolvedValue({
      url: 'https://cdn/document.png',
      publicId: 'document',
      format: 'png',
    });
    const sendWelcome = jest.fn().mockResolvedValue(undefined);
    const service = new UsersService(
      {
        users: {
          findUnique: jest.fn().mockResolvedValue(null),
          findFirst: jest.fn().mockResolvedValue(null),
        },
        $transaction: transaction,
      } as unknown as PrismaService,
      {
        saveUserPhoto,
        saveIdentityDocument,
        deleteSafely: jest.fn(),
      } as unknown as ImageStorageService,
      {
        verify: jest.fn().mockResolvedValue(verifyResult),
      } as unknown as IdentityVerificationService,
      { sendWelcome } as unknown as MailService,
    );
    // El mapeo de la respuesta necesita el registro completo; aquí solo
    // interesa comprobar con qué datos se creó el usuario.
    jest
      .spyOn(
        service as unknown as { findUserInTransaction: () => Promise<unknown> },
        'findUserInTransaction',
      )
      .mockResolvedValue({
        id: 7n,
        id_number: dto.idNumber,
        document_type: 'CC',
        full_name: dto.fullName,
        email: dto.email,
        birth_date: new Date(dto.birthDate),
        birth_city: dto.birthCity,
        gender: dto.gender,
        phone: null,
        status: 'active',
        photo_url: null,
        document_front_url: null,
        document_back_url: null,
        identity_verification_status: 'pending_review',
        block_reason: null,
        blocked_until: null,
        created_at: new Date(),
        updated_at: new Date(),
        user_roles: [{ role_code: 'PLAYER' }],
      });

    return { service, usersCreate, saveUserPhoto, sendWelcome };
  };

  it.each([
    ['unreadable', 'insufficient_text'],
    ['unreadable', 'document_not_recognized'],
    ['mismatch', 'data_not_confirmed'],
    ['unreadable', 'ocr_error'],
  ])('crea la cuenta como pendiente ante %s/%s', async (outcome, failureReason) => {
    const { service, usersCreate, saveUserPhoto } = buildService({
      verified: false,
      outcome,
      details: { failureReason },
    });

    await service.registerPlayer(dto, {
      photo: file,
      documentFront: file,
      documentBack: file,
    });

    expect(saveUserPhoto).toHaveBeenCalled();
    expect(usersCreate.mock.calls[0][0].data).toMatchObject({
      identity_verification_status: 'pending_review',
      identity_verified_at: null,
      status: 'active',
    });
  });

  it('marca verificada la cuenta cuando el documento coincide', async () => {
    const { service, usersCreate } = buildService({
      verified: true,
      outcome: 'verified',
      details: {},
    });

    await service.registerPlayer(dto, {
      photo: file,
      documentFront: file,
      documentBack: file,
    });

    const data = usersCreate.mock.calls[0][0].data;
    expect(data.identity_verification_status).toBe('verified');
    expect(data.identity_verified_at).toBeInstanceOf(Date);
  });
});
