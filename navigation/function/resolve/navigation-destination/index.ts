import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';
import type { ContractNavigationGraph } from '$stylist/navigation/interface/contract/navigation-graph';

/**
 * Destination whose `href` template matches a path, with its `:name` args decoded;
 * the query and the hash are ignored. Among several matches the one with fewer
 * args wins (`/tours/new` over `/tours/:slug`). Inverse of `resolveNavigationHref`.
 */
export function resolveNavigationDestination(
	graph: ContractNavigationGraph,
	path: string
): { destination: ContractNavigationDestination; args: Record<string, string> } | undefined {
	const split = (value: string) => value.split(/[?#]/)[0].replace(/\/+$/, '').split('/');
	const segments = split(path);
	let best:
		{ destination: ContractNavigationDestination; args: Record<string, string> } | undefined;
	let bestCount = Infinity;
	const visit = (destination: ContractNavigationDestination) => {
		destination.destinations?.forEach(visit);
		if (!destination.href) return;
		const template = split(destination.href);
		if (template.length !== segments.length) return;
		const args: Record<string, string> = {};
		for (const [index, part] of template.entries()) {
			if (part.startsWith(':')) {
				if (!segments[index]) return;
				args[part.slice(1)] = decodeURIComponent(segments[index]);
			} else if (part !== segments[index]) return;
		}
		const count = Object.keys(args).length;
		if (count < bestCount) {
			best = { destination, args };
			bestCount = count;
		}
	};
	visit(graph);
	return best;
}
