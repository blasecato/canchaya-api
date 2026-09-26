export interface PasswordResetCodeTemplateData {
    appName: string;
    supportEmail: string;
    logoSrc: string;
    contactPhone: string;
    websiteUrl: string;
    fullName: string;
    code: string;
    expiresInMinutes: number;
}
export interface RenderedEmail {
    subject: string;
    html: string;
    text: string;
}
export declare function renderPasswordResetCodeEmail(data: PasswordResetCodeTemplateData): RenderedEmail;
