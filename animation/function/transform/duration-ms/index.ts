export function parseDurationMs(value: unknown): number {
	const text = String(value ?? '300ms');
	const parsed = Number.parseFloat(text);
	if (!Number.isFinite(parsed)) return 300;
	return text.endsWith('ms') ? parsed : text.endsWith('s') ? parsed * 1000 : parsed;
}
