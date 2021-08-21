export function createId() {
    const date: Date = new Date();
    return date.getTime();
}

export function randamId(): number {
    return Math.floor(Math.random() * 100000);
}