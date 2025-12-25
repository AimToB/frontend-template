import * as sanity from 'sanity';

declare const schema: ({
    type: "document";
    name: "blogPost";
} & Omit<sanity.DocumentDefinition, "preview"> & {
    preview?: sanity.PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
})[];

export { schema };
