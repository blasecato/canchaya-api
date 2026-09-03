import type { UploadedImageFile } from '../uploads/image-storage.types';
import { HomeGalleryService } from './home-gallery.service';
declare const galleryFieldNames: readonly ["image1", "image2", "image3", "image4", "image5"];
type GalleryFieldName = (typeof galleryFieldNames)[number];
type GalleryFiles = Partial<Record<GalleryFieldName, UploadedImageFile[]>>;
export declare class HomeGalleryController {
    private readonly homeGalleryService;
    constructor(homeGalleryService: HomeGalleryService);
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
    replace(files: GalleryFiles | undefined): Promise<({
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
export {};
