import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeBreadcrumbLink } from '$stylist/dialog/interface/recipe/breadcrumb-link';

export function createBreadcrumbLinkState(getProps: () => RecipeBreadcrumbLink) {
	const props = $derived(getProps());
	const linkClass = $derived(
		ClassNamesManager.join(
			'c-breadcrumb-link',
			props.current ? 'c-breadcrumb-link--current' : '',
			props.class ?? ''
		)
	);

	return {
		get linkClass() {
			return linkClass;
		}
	};
}

export default createBreadcrumbLinkState;
