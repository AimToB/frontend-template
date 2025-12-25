declare function getRequestConfig({ locale, }: {
    locale: string;
}): Promise<{
    locale: string;
    messages: any;
    timeZone: string;
    now: Date;
}>;

export { getRequestConfig as default };
