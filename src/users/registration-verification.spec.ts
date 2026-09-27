import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { IdentityVerificationService } from './identity-verification.service';
import { MailService } from '../mail/mail.service';
import { RegisterPlayerDto } from './dto/register-player.dto';

describe('Registro: verificación obligatoria antes de persistir', () => {
  it.each([
    ['unreadable', 'insufficient_text', 'más nítida'],
    ['unreadable', 'document_not_recognized', 'más nítida'],
    ['mismatch', 'data_not_confirmed', 'coincidan'],
    ['unreadable', 'ocr_error', 'unos minutos'],
  ])(
    'bloquea %s/%s sin subir imágenes ni crear usuarios',
    async (outcome, failureReason, message) => {
      const transaction = jest.fn();
      const saveUserPhoto = jest.fn();
      const saveIdentityDocument = jest.fn();
      const verify = jest.fn().mockResolvedValue({
        verified: false,
        outcome,
        details: { failureReason },
      });
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
        } as unknown as ImageStorageService,
        { verify } as unknown as IdentityVerificationService,
        {} as MailService,
      );
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
      await expect(
        service.registerPlayer(dto, {
          photo: file,
          documentFront: file,
          documentBack: file,
        }),
      ).rejects.toThrow(message);
      expect(verify).toHaveBeenCalledWith(
        file,
        file,
        dto.idNumber,
        dto.birthDate,
        dto.fullName,
      );
      expect(transaction).not.toHaveBeenCalled();
      expect(saveUserPhoto).not.toHaveBeenCalled();
      expect(saveIdentityDocument).not.toHaveBeenCalled();
    },
  );
});
