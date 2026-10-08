export function resolveAllowedOption<T extends string>(
	value: T | undefined,
	allowed: readonly T[],
	fallback: T
): T {
	if (!value) return fallback;
	return (allowed as readonly string[]).includes(value) ? value : fallback;
}
