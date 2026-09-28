export declare const DEFAULT_HOME_HERO_SLIDES: readonly [{
    readonly slug: "asprofutpi";
    readonly position: 1;
    readonly eyebrow: "⚽ La casa del fútbol y más";
    readonly title: "Organización Promotora de Torneos";
    readonly accentTitle: "de Fútbol de Pitalito";
    readonly description: "Ligas, copas relámpago y torneos empresariales de fútbol en Pitalito.";
    readonly ctaLabel: "Ver torneos";
    readonly ctaTo: "/tournaments";
    readonly thumbnailTitle: "ASPROFUTPI";
    readonly imageUrl: null;
}, {
    readonly slug: "copa-pitalito";
    readonly position: 2;
    readonly eyebrow: "La emoción se vive en la cancha";
    readonly title: "Copa";
    readonly accentTitle: "Pitalito";
    readonly description: "Reúne a tu equipo y compite por llegar a lo más alto del fútbol local.";
    readonly ctaLabel: "Explorar torneos";
    readonly ctaTo: "/tournaments";
    readonly thumbnailTitle: "Copa Pitalito";
    readonly imageUrl: "/images/cancha1.jpg";
}, {
    readonly slug: "torneo-empresarial";
    readonly position: 3;
    readonly eyebrow: "Competencia, equipo y pasión";
    readonly title: "Torneo";
    readonly accentTitle: "Empresarial";
    readonly description: "Haz que tu empresa también juegue. Crea equipo, participa y vive el torneo.";
    readonly ctaLabel: "Ver competencias";
    readonly ctaTo: "/tournaments";
    readonly thumbnailTitle: "Torneo empresarial";
    readonly imageUrl: "/images/cancha6.webp";
}, {
    readonly slug: "futbol-para-todos";
    readonly position: 4;
    readonly eyebrow: "Tu próximo partido empieza aquí";
    readonly title: "Fútbol para";
    readonly accentTitle: "Todos";
    readonly description: "Encuentra organizaciones, torneos y nuevas oportunidades para competir.";
    readonly ctaLabel: "Conocer organizaciones";
    readonly ctaTo: "/associations";
    readonly thumbnailTitle: "Fútbol para todos";
    readonly imageUrl: "/images/cancha12.jpg";
}];
export type HomeHeroSlideSlug = (typeof DEFAULT_HOME_HERO_SLIDES)[number]['slug'];
export declare const HOME_HERO_SLIDE_SLUGS: ("copa-pitalito" | "asprofutpi" | "torneo-empresarial" | "futbol-para-todos")[];
