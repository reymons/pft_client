export function fuzzySearch(text: string, query: string): boolean {
    if (!query) return true;

    text = text.trim().toLowerCase();
    query = query.trim().toLowerCase();

    let queryIndex = 0;

    for (const char of text) {
        if (char === query[queryIndex]) {
            queryIndex++;

            if (queryIndex === query.length) {
                return true;
            }
        }
    }

    return false;
}
