export function sanitizeFilename(filename: string) {
    return filename
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_\.]/g, '')
        .toLowerCase();
}