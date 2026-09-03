/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { configureApplication } from './../src/config/application.config';
import { setupSwagger } from './../src/config/swagger.config';
import { PrismaService } from './../src/prisma/prisma.service';
import { MAX_IMAGE_SIZE_BYTES } from './../src/uploads/uploads.constants';

describe('AppController (e2e)', () => {
  const authTestSuffix = `${Date.now()}-${process.pid}`;
  const authTestEmail = `auth-e2e-${authTestSuffix}@canchaya.test`;
  const authTestPassword = 'PasswordE2E123!';
  const editorTestEmail = `editor-e2e-${authTestSuffix}@canchaya.test`;
  const viewerTestEmail = `viewer-e2e-${authTestSuffix}@canchaya.test`;
  const foreignAdminTestEmail = `foreign-admin-e2e-${authTestSuffix}@canchaya.test`;
  const associationTestTaxId = `E2E-ASSOC-${authTestSuffix}`;
  const tournamentTypeTestName = `E2E Tournament Type ${authTestSuffix}`;
  const validPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    'base64',
  );
  const originalUploadsDirectory = process.env.UPLOADS_DIRECTORY;
  let temporaryUploadsDirectory: string;
  let app: NestExpressApplication;
  let prisma: PrismaService;
  let authTestUserId: bigint;
  let editorTestUserId: bigint;
  let viewerTestUserId: bigint;
  let foreignAdminTestUserId: bigint;
  let associationTestId: bigint | undefined;
  let tournamentTypeTestId: bigint | undefined;

  beforeAll(async () => {
    temporaryUploadsDirectory = await mkdtemp(
      join(tmpdir(), 'canchaya-e2e-uploads-'),
    );
    process.env.UPLOADS_DIRECTORY = temporaryUploadsDirectory;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    configureApplication(app);
    setupSwagger(app);
    await app.init();
    prisma = app.get(PrismaService);

    const userResponse = await request(app.getHttpServer())
      .post('/api/users')
      .send({
        idNumber: `E2E-${authTestSuffix}`,
        documentType: 'CC',
        fullName: 'Usuario Auth E2E',
        birthDate: '1995-06-20',
        email: authTestEmail,
        password: authTestPassword,
      })
      .expect(201);
    authTestUserId = BigInt(userResponse.body.id as string);

    const scopedUsers = await Promise.all(
      [
        {
          idNumber: `E2E-EDITOR-${authTestSuffix}`,
          fullName: 'Editor Asociación E2E',
          email: editorTestEmail,
        },
        {
          idNumber: `E2E-VIEWER-${authTestSuffix}`,
          fullName: 'Viewer Asociación E2E',
          email: viewerTestEmail,
        },
        {
          idNumber: `E2E-FOREIGN-${authTestSuffix}`,
          fullName: 'Administrador Ajeno E2E',
          email: foreignAdminTestEmail,
        },
      ].map(({ idNumber, fullName, email }) =>
        request(app.getHttpServer())
          .post('/api/users')
          .send({
            idNumber,
            documentType: 'CC',
            fullName,
            birthDate: '1994-03-15',
            email,
            password: authTestPassword,
          })
          .expect(201),
      ),
    );

    editorTestUserId = BigInt(scopedUsers[0].body.id as string);
    viewerTestUserId = BigInt(scopedUsers[1].body.id as string);
    foreignAdminTestUserId = BigInt(scopedUsers[2].body.id as string);
  });

  afterAll(async () => {
    if (associationTestId !== undefined) {
      await prisma.tournaments.deleteMany({
        where: { association_id: associationTestId },
      });
    }
    if (tournamentTypeTestId !== undefined) {
      await prisma.tournament_types.deleteMany({
        where: { id: tournamentTypeTestId },
      });
    }
    await prisma.associations.deleteMany({
      where: { tax_id: associationTestTaxId },
    });
    await prisma.users.deleteMany({
      where: {
        id: {
          in: [
            authTestUserId,
            editorTestUserId,
            viewerTestUserId,
            foreignAdminTestUserId,
          ],
        },
      },
    });

    await app.close();
    await rm(temporaryUploadsDirectory, { force: true, recursive: true });

    if (originalUploadsDirectory === undefined) {
      delete process.env.UPLOADS_DIRECTORY;
    } else {
      process.env.UPLOADS_DIRECTORY = originalUploadsDirectory;
    }
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/roles (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/roles')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/api/users/not-a-number rechaza solicitudes anónimas antes del parámetro', () => {
    return request(app.getHttpServer())
      .get('/api/users/not-a-number')
      .expect(401);
  });

  it('/api/docs-json (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/docs-json')
      .expect(200);

    expect(response.text).toContain('"title":"CanchaYa API"');
    expect(response.text).toContain('"/api/users"');
    expect(response.text).toContain('"/api/users/me"');
    expect(response.text).toContain('"/api/associations"');
    expect(response.text).toContain('"/api/associations/{id}/tournaments"');
    expect(response.text).toContain('"/api/auth/login"');
    expect(response.text).toContain('"/api/auth/logout"');

    const associationsGet = response.body.paths['/api/associations'].get;
    const associationsPost = response.body.paths['/api/associations'].post;
    const associationTournamentsGet =
      response.body.paths['/api/associations/{id}/tournaments'].get;

    expect(associationsGet.security).toEqual([{ 'access-token': [] }]);
    expect(associationsGet.responses).toEqual(
      expect.objectContaining({
        200: expect.any(Object),
        401: expect.any(Object),
        403: expect.any(Object),
      }),
    );
    expect(associationTournamentsGet.security).toEqual([
      { 'access-token': [] },
    ]);
    expect(associationTournamentsGet.responses).toEqual(
      expect.objectContaining({
        200: expect.any(Object),
        401: expect.any(Object),
        403: expect.any(Object),
        404: expect.any(Object),
      }),
    );
    expect(
      associationsPost.requestBody.content['multipart/form-data'].schema.allOf,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          required: ['logo', 'cover'],
          properties: {
            logo: expect.objectContaining({ format: 'binary', type: 'string' }),
            cover: expect.objectContaining({
              format: 'binary',
              type: 'string',
            }),
          },
        }),
      ]),
    );
  });

  it('/api/associations exige token Bearer', () => {
    return request(app.getHttpServer()).get('/api/associations').expect(401);
  });

  it('/api/associations/:id/tournaments exige token Bearer', () => {
    return request(app.getHttpServer())
      .get('/api/associations/1/tournaments')
      .expect(401);
  });

  it('/api/auth/login y /api/auth/logout revocan la sesión actual', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: authTestEmail,
        password: authTestPassword,
        rememberMe: false,
      })
      .expect(200);
    const accessToken = loginResponse.body.accessToken as string;

    expect(loginResponse.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        tokenType: 'Bearer',
        expiresIn: 86400,
        user: expect.objectContaining({
          id: expect.any(String),
          idNumber: expect.stringMatching(/^E2E-/),
          documentType: 'CC',
          fullName: 'Usuario Auth E2E',
          birthDate: '1995-06-20',
          email: authTestEmail,
          phone: null,
          status: 'active',
          roles: [],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      }),
    );

    const profileResponse = await request(app.getHttpServer())
      .get(`/api/users/me?id=${(authTestUserId + 1n).toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(profileResponse.headers['cache-control']).toBe('private, no-store');
    expect(profileResponse.body).toEqual(loginResponse.body.user);
    expect(profileResponse.body).not.toHaveProperty('passwordHash');
    expect(profileResponse.body).not.toHaveProperty('password_hash');
    expect(profileResponse.body).not.toHaveProperty('userRoles');
    expect(profileResponse.body).not.toHaveProperty('authSessions');

    await request(app.getHttpServer())
      .get('/api/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
    await request(app.getHttpServer())
      .get(`/api/users/${authTestUserId.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
    await request(app.getHttpServer())
      .patch(`/api/users/${authTestUserId.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ fullName: 'Intento sin autorización' })
      .expect(403);
    await request(app.getHttpServer())
      .delete(`/api/users/${authTestUserId.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
    await request(app.getHttpServer())
      .get('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
    await request(app.getHttpServer())
      .get('/api/associations/1/tournaments')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
    await request(app.getHttpServer())
      .post('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);

    await prisma.user_roles.create({
      data: { user_id: authTestUserId, role_code: 'SUPER_ADMIN' },
    });

    await request(app.getHttpServer())
      .get('/api/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.roles).toEqual(['SUPER_ADMIN']);
      });
    const usersResponse = await request(app.getHttpServer())
      .get('/api/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const listedUser = usersResponse.body.find(
      (user: { id: string }) => user.id === authTestUserId.toString(),
    );

    expect(listedUser).toEqual(
      expect.objectContaining({
        id: authTestUserId.toString(),
        roles: ['SUPER_ADMIN'],
      }),
    );
    expect(listedUser).not.toHaveProperty('passwordHash');
    expect(listedUser).not.toHaveProperty('password_hash');
    await request(app.getHttpServer())
      .get('/api/users/not-a-number')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);

    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect({ message: 'Sesión cerrada correctamente.' });

    await request(app.getHttpServer())
      .get('/api/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);

    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);

    const persistentLoginResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: authTestEmail,
        password: authTestPassword,
        rememberMe: true,
      })
      .expect(200);

    expect(persistentLoginResponse.body.expiresIn).toBe(2_592_000);

    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .set(
        'Authorization',
        `Bearer ${persistentLoginResponse.body.accessToken as string}`,
      )
      .expect(200);
  });

  it('/api/associations permite al SUPER_ADMIN consultar el contrato público', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: authTestEmail,
        password: authTestPassword,
        rememberMe: false,
      })
      .expect(200);
    const accessToken = loginResponse.body.accessToken as string;

    await request(app.getHttpServer())
      .post('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Asociación incompleta')
      .attach('logo', validPng, {
        filename: 'logo.png',
        contentType: 'image/png',
      })
      .expect(400);

    await request(app.getHttpServer())
      .post('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Asociación con archivo falso')
      .field('description', 'Prueba de firma mágica')
      .field('city', 'Neiva')
      .field('address', 'Calle 1 # 2-3')
      .field('taxId', `${associationTestTaxId}-FAKE`)
      .field('email', `fake-${authTestSuffix}@canchaya.test`)
      .field('phone', '+573001112233')
      .field('ownerUserId', authTestUserId.toString())
      .field('status', 'active')
      .attach('logo', Buffer.from('contenido que no es una imagen'), {
        filename: 'logo.png',
        contentType: 'image/png',
      })
      .attach('cover', validPng, {
        filename: 'cover.png',
        contentType: 'image/png',
      })
      .expect(400);

    await request(app.getHttpServer())
      .post('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Asociación sin logo')
      .field('description', 'Prueba de archivo obligatorio')
      .field('city', 'Neiva')
      .field('address', 'Calle 1 # 2-3')
      .field('taxId', `${associationTestTaxId}-NOLOGO`)
      .field('email', `no-logo-${authTestSuffix}@canchaya.test`)
      .field('phone', '+573001112233')
      .field('ownerUserId', authTestUserId.toString())
      .field('status', 'active')
      .attach('cover', validPng, {
        filename: 'cover.png',
        contentType: 'image/png',
      })
      .expect(400);

    const oversizedJpeg = Buffer.alloc(MAX_IMAGE_SIZE_BYTES + 1, 0);
    oversizedJpeg.set([0xff, 0xd8, 0xff], 0);
    oversizedJpeg.set([0xff, 0xd9], oversizedJpeg.length - 2);

    await request(app.getHttpServer())
      .post('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Asociación con logo pesado')
      .field('description', 'Prueba del límite de archivo')
      .field('city', 'Neiva')
      .field('address', 'Calle 1 # 2-3')
      .field('taxId', `${associationTestTaxId}-LARGE`)
      .field('email', `large-${authTestSuffix}@canchaya.test`)
      .field('phone', '+573001112233')
      .field('ownerUserId', authTestUserId.toString())
      .field('status', 'active')
      .attach('logo', oversizedJpeg, {
        filename: 'large.jpg',
        contentType: 'image/jpeg',
      })
      .attach('cover', validPng, {
        filename: 'cover.png',
        contentType: 'image/png',
      })
      .expect(413);

    const createResponse = await request(app.getHttpServer())
      .post('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', '  Asociación E2E  ')
      .field('description', 'Asociación temporal para pruebas de integración.')
      .field('city', 'Neiva')
      .field('address', 'Calle 1 # 2-3')
      .field('taxId', associationTestTaxId)
      .field('email', `association-${authTestSuffix}@canchaya.test`)
      .field('phone', '+573001112233')
      .field('ownerUserId', authTestUserId.toString())
      .field('status', 'active')
      .attach('logo', validPng, {
        filename: 'logo.png',
        contentType: 'image/png',
      })
      .attach('cover', validPng, {
        filename: 'cover.png',
        contentType: 'image/png',
      })
      .expect(201);
    const associationId = createResponse.body.id as string;
    associationTestId = BigInt(associationId);
    const expectedAssociationKeys = [
      'id',
      'name',
      'description',
      'city',
      'address',
      'taxId',
      'email',
      'phone',
      'logoUrl',
      'coverUrl',
      'status',
      'owner',
      'tournamentCount',
      'teamCount',
      'administratorCount',
      'createdAt',
      'updatedAt',
    ].sort();

    expect(Object.keys(createResponse.body).sort()).toEqual(
      expectedAssociationKeys,
    );
    expect(createResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Asociación E2E',
        description: 'Asociación temporal para pruebas de integración.',
        city: 'Neiva',
        address: 'Calle 1 # 2-3',
        taxId: associationTestTaxId,
        email: `association-${authTestSuffix}@canchaya.test`,
        phone: '+573001112233',
        logoUrl: expect.stringMatching(
          /^\/uploads\/associations\/[0-9a-f-]{36}\.png$/,
        ),
        coverUrl: expect.stringMatching(
          /^\/uploads\/associations\/covers\/[0-9a-f-]{36}\.png$/,
        ),
        status: 'active',
        owner: {
          id: authTestUserId.toString(),
          fullName: 'Usuario Auth E2E',
          email: authTestEmail,
          phone: null,
        },
        tournamentCount: 0,
        teamCount: 0,
        administratorCount: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
    expect(createResponse.body).not.toHaveProperty('ownerUserId');
    expect(createResponse.body).not.toHaveProperty('users');
    expect(createResponse.body.owner).not.toHaveProperty('passwordHash');
    expect(Object.keys(createResponse.body.owner).sort()).toEqual(
      ['id', 'fullName', 'email', 'phone'].sort(),
    );

    await request(app.getHttpServer())
      .get(createResponse.body.logoUrl as string)
      .expect('X-Content-Type-Options', 'nosniff')
      .expect('Content-Type', /image\/png/)
      .expect(200);

    await request(app.getHttpServer())
      .get(createResponse.body.coverUrl as string)
      .expect('X-Content-Type-Options', 'nosniff')
      .expect('Content-Type', /image\/png/)
      .expect(200);

    await request(app.getHttpServer())
      .get('/api/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.roles).toEqual(['ASSOCIATION_ADMIN', 'SUPER_ADMIN']);
      });

    await prisma.user_roles.createMany({
      data: [editorTestUserId, viewerTestUserId, foreignAdminTestUserId].map(
        (userId) => ({
          user_id: userId,
          role_code: 'ASSOCIATION_ADMIN',
        }),
      ),
    });
    await prisma.association_administrators.createMany({
      data: [
        {
          association_id: associationTestId,
          user_id: editorTestUserId,
          permission_level: 'editor',
          status: 'active',
        },
        {
          association_id: associationTestId,
          user_id: viewerTestUserId,
          permission_level: 'viewer',
          status: 'active',
        },
      ],
    });

    const loginAs = async (email: string): Promise<string> => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email, password: authTestPassword, rememberMe: false })
        .expect(200);

      return response.body.accessToken as string;
    };
    const [editorToken, viewerToken, foreignAdminToken] = await Promise.all([
      loginAs(editorTestEmail),
      loginAs(viewerTestEmail),
      loginAs(foreignAdminTestEmail),
    ]);
    const originalCoverUrl = createResponse.body.coverUrl as string;
    let activeCoverUrl = originalCoverUrl;

    const listResponse = await request(app.getHttpServer())
      .get('/api/associations')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const listedAssociation = listResponse.body.find(
      (association: { id: string }) => association.id === associationId,
    );

    expect(listedAssociation).toBeDefined();
    expect(Object.keys(listedAssociation).sort()).toEqual(
      expectedAssociationKeys,
    );

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            id: associationId,
            coverUrl: createResponse.body.coverUrl,
            administratorCount: 3,
            permissions: {
              canEdit: true,
              canManageOwner: true,
              canManageTournaments: true,
              isOwner: true,
              permissionLevel: 'super_admin',
            },
          }),
        );
      });

    const tournamentType = await prisma.tournament_types.create({
      data: {
        name: tournamentTypeTestName,
        description: 'Tipo temporal para probar torneos por asociación.',
      },
      select: { id: true },
    });
    tournamentTypeTestId = tournamentType.id;
    const tournamentCreatePayload = {
      name: `Torneo administrable ${authTestSuffix}`,
      tournamentTypeId: tournamentType.id.toString(),
      sportType: 'Fútbol',
      modality: 'Fútbol 7',
      startDate: '2027-09-01',
      registrationFee: 0,
      currencyCode: 'COP',
      grandPrize: 0,
      secondPrize: 0,
      thirdPrize: 0,
      maxTeams: 8,
      minPlayersPerTeam: 7,
      maxPlayersPerTeam: 14,
      phase: 'draft',
      status: 'active',
    };

    await request(app.getHttpServer())
      .post(`/api/associations/${associationId}/tournaments`)
      .send(tournamentCreatePayload)
      .expect(401);

    await request(app.getHttpServer())
      .post(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${editorToken}`)
      .send(tournamentCreatePayload)
      .expect(403);

    await request(app.getHttpServer())
      .post(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${viewerToken}`)
      .send(tournamentCreatePayload)
      .expect(403);

    await request(app.getHttpServer())
      .post(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${foreignAdminToken}`)
      .send(tournamentCreatePayload)
      .expect(403);

    await request(app.getHttpServer())
      .post(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ...tournamentCreatePayload,
        associationId: '9223372036854775807',
        createdBy: foreignAdminTestUserId.toString(),
      })
      .expect(400);

    await request(app.getHttpServer())
      .post('/api/tournaments')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(tournamentCreatePayload)
      .expect(404);

    const tournamentCreateResponse = await request(app.getHttpServer())
      .post(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', tournamentCreatePayload.name)
      .field('description', '')
      .field('tournamentTypeId', tournamentType.id.toString())
      .field('sportType', tournamentCreatePayload.sportType)
      .field('modality', tournamentCreatePayload.modality)
      .field('startDate', tournamentCreatePayload.startDate)
      .field('endDate', '')
      .field('registrationStartDate', '')
      .field('registrationEndDate', '')
      .field('registrationFee', '0')
      .field('currencyCode', 'COP')
      .field('grandPrize', '0')
      .field('secondPrize', '0')
      .field('thirdPrize', '0')
      .field('maxTeams', '8')
      .field('minPlayersPerTeam', '7')
      .field('maxPlayersPerTeam', '14')
      .field('locationName', '')
      .field('locationAddress', '')
      .field('rulesUrl', '')
      .field('phase', 'draft')
      .field('status', 'active')
      .attach('photo', validPng, {
        filename: 'tournament.png',
        contentType: 'image/png',
      })
      .expect(201);
    const managedTournamentId = tournamentCreateResponse.body.id as string;
    let activeTournamentPhotoUrl = tournamentCreateResponse.body
      .photoUrl as string;

    expect(tournamentCreateResponse.body).toEqual(
      expect.objectContaining({
        associationId,
        name: tournamentCreatePayload.name,
        description: null,
        endDate: null,
        registrationStartDate: null,
        registrationEndDate: null,
        registrationFee: '0',
        maxTeams: 8,
        minPlayersPerTeam: 7,
        maxPlayersPerTeam: 14,
        locationName: null,
        locationAddress: null,
        rulesUrl: null,
        phase: 'draft',
        status: 'active',
        photoUrl: expect.stringMatching(
          /^\/uploads\/tournaments\/[0-9a-f-]{36}\.png$/,
        ),
      }),
    );
    await request(app.getHttpServer())
      .get(activeTournamentPhotoUrl)
      .expect('Content-Type', /image\/png/)
      .expect(200);

    await expect(
      prisma.tournaments.findUniqueOrThrow({
        where: { id: BigInt(managedTournamentId) },
        select: { association_id: true, created_by: true },
      }),
    ).resolves.toEqual({
      association_id: associationTestId,
      created_by: authTestUserId,
    });

    await request(app.getHttpServer())
      .get('/api/tournament-types')
      .set('Authorization', `Bearer ${editorToken}`)
      .expect(200);
    await request(app.getHttpServer())
      .post('/api/tournament-types')
      .set('Authorization', `Bearer ${editorToken}`)
      .send({ name: `Tipo prohibido ${authTestSuffix}` })
      .expect(403);

    const tournamentBase = {
      association_id: associationTestId,
      description: 'Torneo temporal E2E.',
      tournament_type_id: tournamentType.id,
      sport_type: 'Fútbol',
      modality: 'Fútbol 7',
      end_date: new Date('2027-12-01T00:00:00.000Z'),
      registration_start_date: new Date('2026-07-01T00:00:00.000Z'),
      registration_end_date: new Date('2026-08-01T00:00:00.000Z'),
      registration_fee: '150000.50',
      currency_code: 'COP',
      grand_prize: '5000000',
      second_prize: '2500000',
      third_prize: '1000000',
      max_teams: 16,
      max_players_per_team: 18,
      location_name: 'Estadio E2E',
      location_address: 'Calle E2E # 1-2',
      rules_url: 'https://example.test/rules.pdf',
      photo_url: 'https://example.test/tournament.png',
      created_by: authTestUserId,
    };

    await prisma.tournaments.createMany({
      data: [
        {
          ...tournamentBase,
          name: `Disponible posterior ${authTestSuffix}`,
          start_date: new Date('2027-10-01T00:00:00.000Z'),
          phase: 'registration',
          status: 'active',
        },
        {
          ...tournamentBase,
          name: `Disponible anterior ${authTestSuffix}`,
          start_date: new Date('2027-09-01T00:00:00.000Z'),
          phase: 'in_progress',
          status: 'active',
        },
        {
          ...tournamentBase,
          name: `Borrador ${authTestSuffix}`,
          start_date: new Date('2027-08-01T00:00:00.000Z'),
          phase: 'draft',
          status: 'active',
        },
        {
          ...tournamentBase,
          name: `Finalizado ${authTestSuffix}`,
          start_date: new Date('2027-07-01T00:00:00.000Z'),
          phase: 'finished',
          status: 'active',
        },
        {
          ...tournamentBase,
          name: `Cancelado ${authTestSuffix}`,
          start_date: new Date('2027-06-01T00:00:00.000Z'),
          phase: 'cancelled',
          status: 'active',
        },
        {
          ...tournamentBase,
          name: `Inactivo ${authTestSuffix}`,
          start_date: new Date('2027-05-01T00:00:00.000Z'),
          phase: 'registration',
          status: 'inactive',
        },
      ],
    });

    const tournamentsResponse = await request(app.getHttpServer())
      .get(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(
      tournamentsResponse.body.map((tournament: { name: string }) =>
        tournament.name.replace(` ${authTestSuffix}`, ''),
      ),
    ).toEqual(['Disponible anterior', 'Disponible posterior']);
    expect(tournamentsResponse.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        associationId,
        tournamentType: expect.objectContaining({
          id: tournamentType.id.toString(),
          name: tournamentTypeTestName,
          description: 'Tipo temporal para probar torneos por asociación.',
          minPlayersPerTeam: 1,
          maxPlayersPerTeam: 25,
        }),
        startDate: '2027-09-01',
        registrationFee: '150000.5',
        registeredTeamCount: 0,
        locationName: 'Estadio E2E',
        locationAddress: 'Calle E2E # 1-2',
        phase: 'in_progress',
        status: 'active',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );

    const managementTournamentsResponse = await request(app.getHttpServer())
      .get(`/api/associations/${associationId}/tournaments?scope=management`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(
      managementTournamentsResponse.body.some(
        (tournament: { id: string; phase: string }) =>
          tournament.id === managedTournamentId && tournament.phase === 'draft',
      ),
    ).toBe(true);

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}/tournaments?scope=management`)
      .set('Authorization', `Bearer ${editorToken}`)
      .expect(403);
    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}/tournaments?scope=management`)
      .set('Authorization', `Bearer ${viewerToken}`)
      .expect(403);

    await request(app.getHttpServer())
      .get('/api/associations/9223372036854775807/tournaments')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${editorToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.permissions).toEqual({
          canEdit: true,
          canManageOwner: false,
          canManageTournaments: false,
          isOwner: false,
          permissionLevel: 'editor',
        });
      });

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${viewerToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.permissions).toEqual({
          canEdit: false,
          canManageOwner: false,
          canManageTournaments: false,
          isOwner: false,
          permissionLevel: 'viewer',
        });
      });

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${foreignAdminToken}`)
      .expect(403);

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${viewerToken}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}/tournaments`)
      .set('Authorization', `Bearer ${foreignAdminToken}`)
      .expect(403);

    await request(app.getHttpServer())
      .patch(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${viewerToken}`)
      .send({ name: 'Intento viewer' })
      .expect(403);

    await request(app.getHttpServer())
      .patch(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${foreignAdminToken}`)
      .send({ name: 'Intento administrador ajeno' })
      .expect(403);

    const editorUpdateResponse = await request(app.getHttpServer())
      .patch(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${editorToken}`)
      .field('description', 'Descripción editada mediante multipart.')
      .attach('cover', validPng, {
        filename: 'new-cover.png',
        contentType: 'image/png',
      })
      .expect(200);

    expect(editorUpdateResponse.body).toEqual(
      expect.objectContaining({
        description: 'Descripción editada mediante multipart.',
        coverUrl: expect.stringMatching(
          /^\/uploads\/associations\/covers\/[0-9a-f-]{36}\.png$/,
        ),
        permissions: expect.objectContaining({
          canEdit: true,
          permissionLevel: 'editor',
        }),
      }),
    );
    activeCoverUrl = editorUpdateResponse.body.coverUrl as string;
    expect(activeCoverUrl).not.toBe(originalCoverUrl);

    await request(app.getHttpServer()).get(originalCoverUrl).expect(404);
    await request(app.getHttpServer())
      .get(activeCoverUrl)
      .expect('Content-Type', /image\/png/)
      .expect(200);

    await prisma.association_administrators.update({
      where: {
        association_id_user_id: {
          association_id: associationTestId,
          user_id: editorTestUserId,
        },
      },
      data: { permission_level: 'administrator' },
    });

    await request(app.getHttpServer())
      .patch(
        `/api/associations/${associationId}/tournaments/${managedTournamentId}`,
      )
      .set('Authorization', `Bearer ${editorToken}`)
      .send({ description: 'Actualizado por administrador de asociación.' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.description).toBe(
          'Actualizado por administrador de asociación.',
        );
      });

    await prisma.user_roles.delete({
      where: {
        user_id_role_code: {
          user_id: authTestUserId,
          role_code: 'SUPER_ADMIN',
        },
      },
    });

    await request(app.getHttpServer())
      .get(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.permissions).toEqual({
          canEdit: true,
          canManageOwner: false,
          canManageTournaments: true,
          isOwner: true,
          permissionLevel: 'owner',
        });
      });

    await request(app.getHttpServer())
      .patch(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'active' })
      .expect(200);

    const previousTournamentPhotoUrl = activeTournamentPhotoUrl;
    const ownerTournamentUpdateResponse = await request(app.getHttpServer())
      .patch(
        `/api/associations/${associationId}/tournaments/${managedTournamentId}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .field('description', '')
      .field('endDate', '')
      .field('registrationStartDate', '')
      .field('registrationEndDate', '')
      .field('locationName', '')
      .field('locationAddress', '')
      .field('rulesUrl', '')
      .attach('photo', validPng, {
        filename: 'new-tournament.png',
        contentType: 'image/png',
      })
      .expect(200);

    expect(ownerTournamentUpdateResponse.body).toEqual(
      expect.objectContaining({
        id: managedTournamentId,
        description: null,
        endDate: null,
        registrationStartDate: null,
        registrationEndDate: null,
        locationName: null,
        locationAddress: null,
        rulesUrl: null,
        photoUrl: expect.stringMatching(
          /^\/uploads\/tournaments\/[0-9a-f-]{36}\.png$/,
        ),
      }),
    );
    activeTournamentPhotoUrl = ownerTournamentUpdateResponse.body
      .photoUrl as string;
    expect(activeTournamentPhotoUrl).not.toBe(previousTournamentPhotoUrl);
    await request(app.getHttpServer())
      .get(previousTournamentPhotoUrl)
      .expect(404);

    await request(app.getHttpServer())
      .patch(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ ownerUserId: foreignAdminTestUserId.toString() })
      .expect(403);

    await prisma.user_roles.create({
      data: { user_id: authTestUserId, role_code: 'SUPER_ADMIN' },
    });

    await request(app.getHttpServer())
      .delete(
        `/api/associations/${associationId}/tournaments/${managedTournamentId}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(managedTournamentId);
      });
    await request(app.getHttpServer())
      .get(activeTournamentPhotoUrl)
      .expect(404);

    await prisma.tournaments.deleteMany({
      where: { association_id: associationTestId },
    });
    await prisma.tournament_types.delete({ where: { id: tournamentType.id } });

    await request(app.getHttpServer())
      .patch(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Asociación E2E actualizada' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.name).toBe('Asociación E2E actualizada');
        expect(Object.keys(body).sort()).toEqual(
          [...expectedAssociationKeys, 'permissions'].sort(),
        );
      });

    await request(app.getHttpServer())
      .delete(`/api/associations/${associationId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(associationId);
        expect(Object.keys(body).sort()).toEqual(expectedAssociationKeys);
      });

    await request(app.getHttpServer())
      .get(createResponse.body.logoUrl as string)
      .expect(404);

    await request(app.getHttpServer()).get(activeCoverUrl).expect(404);

    await Promise.all(
      [accessToken, editorToken, viewerToken, foreignAdminToken].map((token) =>
        request(app.getHttpServer())
          .post('/api/auth/logout')
          .set('Authorization', `Bearer ${token}`)
          .expect(200),
      ),
    );
  });

  it('/api/auth/login rechaza credenciales incorrectas', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: authTestEmail,
        password: 'password-incorrecto',
      })
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toBe('Credenciales inválidas.');
      });
  });

  it('/api/auth/logout exige token Bearer', () => {
    return request(app.getHttpServer()).post('/api/auth/logout').expect(401);
  });

  it('/api/users/me exige token Bearer', () => {
    return request(app.getHttpServer()).get('/api/users/me').expect(401);
  });
});
