import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { TeamLineupService } from './team-lineup.service';
import {
  FORMATIONS_BY_PLAYERS,
  buildSlotKeysForFormation,
  parsePlayersOnPitch,
} from './team-lineup.constants';

describe('TeamLineupService', () => {
  const makeRegistration = (overrides?: {
    modality?: string;
    captainId?: bigint;
    lineup?: unknown;
  }) => ({
    tournament_id: 10n,
    team_id: 31n,
    request_status: 'approved',
    lineup: overrides?.lineup ?? null,
    tournaments: {
      id: 10n,
      name: 'Copa Arena Fútbol 5',
      modality: overrides?.modality ?? 'Fútbol 5',
    },
    teams: {
      id: 31n,
      name: 'ARENA KINGS',
      photo_url: null,
      primary_color: '#FFFFFF',
      secondary_color: '#000000',
      captain_user_id: overrides?.captainId ?? 1n,
      users_teams_captain_user_idTousers: { full_name: 'Alejandro Acevedo' },
      team_members: [
        { user_id: 1n, users: { id: 1n, full_name: 'Alejandro Acevedo' } },
        { user_id: 2n, users: { id: 2n, full_name: 'Carlos Gómez' } },
        { user_id: 3n, users: { id: 3n, full_name: 'Diego Rojas' } },
      ],
    },
    tournament_team_players: [
      {
        player_id: 1n,
        jersey_number: 10,
        position: 'Delantero',
        is_captain: true,
        team_members: { users: { id: 1n, full_name: 'Alejandro Acevedo' } },
      },
      {
        player_id: 2n,
        jersey_number: null,
        position: null,
        is_captain: false,
        team_members: { users: { id: 2n, full_name: 'Carlos Gómez' } },
      },
    ],
  });

  it('ensures every modality formation has max 4 players per line and matches modality count', () => {
    for (const [playersStr, formations] of Object.entries(FORMATIONS_BY_PLAYERS)) {
      const players = Number(playersStr);
      for (const f of formations) {
        const lines = f.split('-').map(Number);
        expect(lines.every((n) => n >= 1 && n <= 4)).toBe(true);
        expect(lines.reduce((a, b) => a + b, 0) + 1).toBe(players);
        expect(buildSlotKeysForFormation(f)).toHaveLength(players);
      }
    }
    expect(parsePlayersOnPitch('Fútbol 5')).toBe(5);
    expect(parsePlayersOnPitch('Fútbol 11')).toBe(11);
  });

  it('returns canEdit=true for captain, assigns fallback dorsals, and returns canEdit=false for regular players', async () => {
    const prisma = {
      tournament_team_registrations: {
        findMany: jest.fn().mockResolvedValue([makeRegistration()]),
      },
    };
    const service = new TeamLineupService(prisma as never);

    const asCaptain = await service.getMyLineup(10n, 1n);
    expect(asCaptain.canEdit).toBe(true);
    expect(asCaptain.playersOnPitch).toBe(5);
    expect(asCaptain.formation).toBe('2-2');
    expect(asCaptain.slots).toHaveLength(5);
    expect(asCaptain.roster).toHaveLength(3);
    // Todos los jugadores tienen dorsal único entre 1 y 99
    const numbers = asCaptain.roster.map((p) => p.jerseyNumber);
    expect(new Set(numbers).size).toBe(3);
    expect(asCaptain.roster.find((p) => p.playerId === '1')?.firstName).toBe(
      'Alejandro',
    );

    const asTeammate = await service.getMyLineup(10n, 2n);
    expect(asTeammate.canEdit).toBe(false);
  });

  it('forbids non-captain players from modifying the lineup', async () => {
    const prisma = {
      tournament_team_registrations: {
        findMany: jest.fn().mockResolvedValue([makeRegistration()]),
      },
    };
    const service = new TeamLineupService(prisma as never);

    await expect(
      service.updateMyLineup(10n, 2n, {
        formation: '2-2',
        slots: buildSlotKeysForFormation('2-2').map((slotKey) => ({
          slotKey,
          playerId: null,
        })),
      }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('rejects invalid formation for modality and saves valid lineup for captain', async () => {
    const prisma = {
      tournament_team_registrations: {
        findMany: jest.fn().mockResolvedValue([makeRegistration()]),
        update: jest.fn().mockResolvedValue({}),
      },
    };
    const service = new TeamLineupService(prisma as never);

    await expect(
      service.updateMyLineup(10n, 1n, {
        formation: '4-4-2',
        slots: buildSlotKeysForFormation('2-2').map((slotKey) => ({
          slotKey,
          playerId: null,
        })),
      }),
    ).rejects.toThrow(BadRequestException);

    await service.updateMyLineup(10n, 1n, {
      formation: '1-2-1',
      slots: [
        { slotKey: 'gk', playerId: '2' },
        { slotKey: 'l0-0', playerId: '3' },
        { slotKey: 'l1-0', playerId: null },
        { slotKey: 'l1-1', playerId: null },
        { slotKey: 'l2-0', playerId: '1' },
      ],
    });
    expect(prisma.tournament_team_registrations.update).toHaveBeenCalledTimes(1);
  });
});
