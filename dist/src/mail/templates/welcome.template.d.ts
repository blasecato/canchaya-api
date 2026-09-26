export interface WelcomeTemplateData {
    appName: string;
    supportEmail: string;
    logoSrc: string;
    contactPhone: string;
    websiteUrl: string;
    fullName: string;
}
export interface RenderedEmail {
    subject: string;
    html: string;
    text: string;
}
export declare function renderWelcomeEmail(data: WelcomeTemplateData): RenderedEmail;
