import type { UploadedImageFile } from '../uploads/image-storage.types';
import { LocalImageStorageService } from '../uploads/local-image-storage.service';
export type HomeGalleryUpload = {
    slot: number;
    file: UploadedImageFile;
};
export declare class HomeGalleryService {
    private readonly localStorage;
    constructor(localStorage: LocalImageStorageService);
    findAll(): Promise<({
        imageUrl: string;
        slot: 1;
        label: "Partido nocturno de fútbol";
    } | {
        imageUrl: string;
        slot: 2;
        label: "Equipo antes del partido";
    } | {
        imageUrl: string;
        slot: 3;
        label: "Jugadores en competencia";
    } | {
        imageUrl: string;
        slot: 4;
        label: "Celebración de equipo";
    } | {
        imageUrl: string;
        slot: 5;
        label: "Premiación del torneo";
    })[]>;
    replace(uploads: HomeGalleryUpload[]): Promise<({
        imageUrl: string;
        slot: 1;
        label: "Partido nocturno de fútbol";
    } | {
        imageUrl: string;
        slot: 2;
        label: "Equipo antes del partido";
    } | {
        imageUrl: string;
        slot: 3;
        label: "Jugadores en competencia";
    } | {
        imageUrl: string;
        slot: 4;
        label: "Celebración de equipo";
    } | {
        imageUrl: string;
        slot: 5;
        label: "Premiación del torneo";
    })[]>;
}
