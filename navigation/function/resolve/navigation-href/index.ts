import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';

/**
 * Address of a destination with its args: `:name` segments of `href` are replaced by
 * URI-encoded `args.name` (`/admin/orders/:number` + `{ number: 42 }` → `/admin/orders/42`).
 * Undefined when the destination has no `href` or a segment has no arg.
 */
export function resolveNavigationHref(
	destination: Pick<ContractNavigationDestination, 'href'>,
	args?: Record<string, unknown>
): string | undefined {
	if (!destination.href) return undefined;
	let missing = false;
	const href = destination.href.replace(/:([A-Za-z_][\w-]*)/g, (_, name: string) => {
		const value = args?.[name];
		if (value === undefined || value === null || value === '') missing = true;
		return encodeURIComponent(String(value ?? ''));
	});
	return missing ? undefined : href;
}
