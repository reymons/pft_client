const dateFormatter = new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export function formatDate(d: Date) {
    return dateFormatter.format(d);
}
