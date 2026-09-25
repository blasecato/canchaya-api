"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationAnnouncementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
const association_announcement_mapper_1 = require("./association-announcement.mapper");
const associations_service_1 = require("./associations.service");
let AssociationAnnouncementsService = class AssociationAnnouncementsService {
    prisma;
    associationsService;
    imageStorage;
    constructor(prisma, associationsService, imageStorage) {
        this.prisma = prisma;
        this.associationsService = associationsService;
        this.imageStorage = imageStorage;
    }
    async findAll(associationId, requestingUserId, scope = 'visible') {
        if (scope === 'management') {
            await this.assertCanManage(associationId, requestingUserId);
        }
        else {
            await this.associationsService.getAssociationPermissions(this.prisma, associationId, requestingUserId);
        }
        const today = this.todayInColombia();
        const announcements = await this.prisma.association_announcements.findMany({
            where: {
                association_id: associationId,
                ...(scope === 'visible'
                    ? { starts_on: { lte: today }, ends_on: { gte: today } }
                    : {}),
            },
            orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
            select: association_announcement_mapper_1.associationAnnouncementSelect,
        });
        return announcements.map((announcement) => (0, association_announcement_mapper_1.toAssociationAnnouncementResponse)(announcement, today));
    }
    async create(associationId, requestingUserId, dto, image) {
        await this.assertCanManage(associationId, requestingUserId);
        const dates = this.parseDateRange(dto.startsOn, dto.endsOn);
        const uploaded = await this.imageStorage.saveAssociationAnnouncement(image);
        try {
            const announcement = await this.prisma.association_announcements.create({
                data: {
                    association_id: associationId,
                    title: dto.title,
                    description: dto.description,
                    contact_phone: dto.contactPhone ?? null,
                    address: dto.address ?? null,
                    registration_fee: dto.registrationFee ?? null,
                    registration_starts_on: this.parseOptionalDate(dto.registrationStartsOn, 'fecha de inicio de inscripciones'),
                    tournament_starts_on: this.parseOptionalDate(dto.tournamentStartsOn, 'fecha de inicio del torneo'),
                    first_place_prize: dto.firstPlacePrize ?? null,
                    second_place_prize: dto.secondPlacePrize ?? null,
                    image_url: uploaded.url,
                    image_public_id: uploaded.publicId,
                    starts_on: dates.startsOn,
                    ends_on: dates.endsOn,
                    created_by: requestingUserId,
                },
                select: association_announcement_mapper_1.associationAnnouncementSelect,
            });
            return this.toResponse(announcement);
        }
        catch (error) {
            await this.imageStorage.deleteSafely(uploaded);
            throw error;
        }
    }
    async update(associationId, announcementId, requestingUserId, dto, image) {
        await this.assertCanManage(associationId, requestingUserId);
        const current = await this.findRecord(associationId, announcementId);
        const currentStartsOn = this.toDateValue(current.starts_on);
        const currentEndsOn = this.toDateValue(current.ends_on);
        const dates = this.parseDateRange(dto.startsOn ?? currentStartsOn, dto.endsOn ?? currentEndsOn);
        const uploaded = image
            ? await this.imageStorage.saveAssociationAnnouncement(image)
            : undefined;
        let updated;
        try {
            updated = await this.prisma.association_announcements.update({
                where: { id: announcementId },
                data: {
                    title: dto.title,
                    description: dto.description,
                    contact_phone: dto.contactPhone,
                    address: dto.address,
                    registration_fee: dto.registrationFee,
                    registration_starts_on: dto.registrationStartsOn === undefined
                        ? undefined
                        : this.parseOptionalDate(dto.registrationStartsOn, 'fecha de inicio de inscripciones'),
                    tournament_starts_on: dto.tournamentStartsOn === undefined
                        ? undefined
                        : this.parseOptionalDate(dto.tournamentStartsOn, 'fecha de inicio del torneo'),
                    first_place_prize: dto.firstPlacePrize,
                    second_place_prize: dto.secondPlacePrize,
                    starts_on: dates.startsOn,
                    ends_on: dates.endsOn,
                    image_url: uploaded?.url,
                    image_public_id: uploaded?.publicId,
                    updated_at: new Date(),
                },
                select: association_announcement_mapper_1.associationAnnouncementSelect,
            });
        }
        catch (error) {
            if (uploaded)
                await this.imageStorage.deleteSafely(uploaded);
            throw error;
        }
        if (uploaded) {
            await this.imageStorage.deleteSafely({
                url: current.image_url,
                publicId: current.image_public_id,
            });
        }
        return this.toResponse(updated);
    }
    async remove(associationId, announcementId, requestingUserId) {
        await this.assertCanManage(associationId, requestingUserId);
        const current = await this.findRecord(associationId, announcementId);
        await this.prisma.association_announcements.delete({
            where: { id: announcementId },
        });
        await this.imageStorage.deleteSafely({
            url: current.image_url,
            publicId: current.image_public_id,
        });
        return this.toResponse(current);
    }
    async assertCanManage(associationId, requestingUserId) {
        const permissions = await this.associationsService.getAssociationPermissions(this.prisma, associationId, requestingUserId);
        if (!permissions.canEdit) {
            throw new common_1.ForbiddenException('No tienes permisos para administrar las publicaciones de esta asociación.');
        }
    }
    async findRecord(associationId, announcementId) {
        const announcement = await this.prisma.association_announcements.findFirst({
            where: { id: announcementId, association_id: associationId },
            select: association_announcement_mapper_1.associationAnnouncementSelect,
        });
        if (!announcement) {
            throw new common_1.NotFoundException('La publicación de la asociación no existe.');
        }
        return announcement;
    }
    parseDateRange(startsOn, endsOn) {
        const parsedStartsOn = this.parseDate(startsOn, 'fecha inicial');
        const parsedEndsOn = this.parseDate(endsOn, 'fecha final');
        if (parsedEndsOn < parsedStartsOn) {
            throw new common_1.BadRequestException('La fecha final debe ser igual o posterior a la fecha inicial.');
        }
        return { startsOn: parsedStartsOn, endsOn: parsedEndsOn };
    }
    parseOptionalDate(value, label) {
        if (value === null || value === undefined || value === '')
            return null;
        return this.parseDate(value, label);
    }
    parseDate(value, label) {
        const date = new Date(`${value}T00:00:00.000Z`);
        if (Number.isNaN(date.getTime()) || this.toDateValue(date) !== value) {
            throw new common_1.BadRequestException(`La ${label} no es válida.`);
        }
        return date;
    }
    todayInColombia() {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Bogota',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).formatToParts(new Date());
        const values = Object.fromEntries(parts
            .filter(({ type }) => ['year', 'month', 'day'].includes(type))
            .map(({ type, value }) => [type, Number(value)]));
        return new Date(Date.UTC(values.year, values.month - 1, values.day));
    }
    toDateValue(value) {
        return value.toISOString().slice(0, 10);
    }
    toResponse(announcement) {
        return (0, association_announcement_mapper_1.toAssociationAnnouncementResponse)(announcement, this.todayInColombia());
    }
};
exports.AssociationAnnouncementsService = AssociationAnnouncementsService;
exports.AssociationAnnouncementsService = AssociationAnnouncementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        associations_service_1.AssociationsService,
        image_storage_service_1.ImageStorageService])
], AssociationAnnouncementsService);
//# sourceMappingURL=association-announcements.service.js.map