export function resolveCharacterCountState(ratio: number): 'default' | 'warning' | 'danger' {
	if (ratio >= 0.9) return 'danger';
	if (ratio >= 0.8) return 'warning';
	return 'default';
}
