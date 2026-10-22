import { MediaQuery } from 'svelte/reactivity';
import { createNavigationState } from '$stylist/navigation/function/state/navigation/index.svelte';
import type { ContractNavigationDrawerSection } from '$stylist/navigation/interface/contract/navigation-drawer-section';
import type { RecipeActivity } from '$stylist/navigation/interface/recipe/activity';

/** Activity shell state: navigator, drawer mode/open state and the fragment transition. */
export function createActivityState(getProps: () => RecipeActivity) {
	const props = $derived(getProps());
	const navigator = createNavigationState(() => ({
		graph: props.graph,
		initial: props.initial,
		onNavigate: props.onNavigate
	}));
	const permanentQuery = $derived(
		new MediaQuery(props.permanentDrawer ?? '(min-width: 1024px)', false)
	);
	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false);
	let drawerOpen = $state(false);

	const permanent = $derived(permanentQuery.current);
	const modalOpen = $derived(!permanent && drawerOpen);
	const navigationMode = $derived<'menu' | 'up' | 'none'>(
		!navigator.isTopLevel && navigator.canGoBack ? 'up' : permanent ? 'none' : 'menu'
	);
	const showFab = $derived(!!props.fab && navigator.destination.fab !== false);

	/** Top-level destinations grouped by their nested graph. */
	const sections = $derived.by(() => {
		const result: ContractNavigationDrawerSection[] = [];
		for (const node of navigator.composite.topLevel()) {
			const label = node.parent && node.parent.parent ? node.parent.label : undefined;
			const last = result.at(-1);
			if (last && last.label === label) last.destinations.push(node.destination);
			else result.push({ label, destinations: [node.destination] });
		}
		return result;
	});

	const transition = $derived({
		x: navigator.direction === 'forward' ? 24 : navigator.direction === 'back' ? -24 : 0,
		y: navigator.direction === 'replace' ? 8 : 0,
		duration: reducedMotion.current ? 0 : 220
	});

	const restProps = $derived.by(() => {
		const {
			graph: _graph,
			initial: _initial,
			heading: _heading,
			permanentDrawer: _permanentDrawer,
			fragment: _fragment,
			actions: _actions,
			fab: _fab,
			drawerHeader: _drawerHeader,
			drawerFooter: _drawerFooter,
			onNavigate: _onNavigate,
			class: _class,
			...rest
		} = props;
		return rest;
	});

	function handleNavigation() {
		if (navigationMode === 'up') navigator.back();
		else drawerOpen = !drawerOpen;
	}

	function select(id: string) {
		navigator.select(id);
		drawerOpen = false;
	}

	function closeDrawer() {
		drawerOpen = false;
	}

	return {
		get navigator() {
			return navigator;
		},
		get permanent() {
			return permanent;
		},
		get drawerOpen() {
			return drawerOpen;
		},
		get modalOpen() {
			return modalOpen;
		},
		get navigationMode() {
			return navigationMode;
		},
		get showFab() {
			return showFab;
		},
		get sections() {
			return sections;
		},
		get transition() {
			return transition;
		},
		get restProps() {
			return restProps;
		},
		handleNavigation,
		select,
		closeDrawer
	};
}
