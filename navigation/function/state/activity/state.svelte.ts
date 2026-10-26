import { MediaQuery } from 'svelte/reactivity';
import { createNavigationState } from '$stylist/navigation/function/state/navigation/state.svelte';
import type { ContractNavigationDrawerSection } from '$stylist/navigation/interface/contract/navigation-drawer-section';
import type { RecipeActivity } from '$stylist/navigation/interface/recipe/activity';

/** Activity shell state: navigator, drawer mode/open state and the fragment transition. */
export function createActivityState(getProps: () => RecipeActivity) {
	const props = $derived(getProps());
	const navigator = createNavigationState(() => ({
		graph: props.graph,
		initial: props.initial,
		current: props.current,
		currentArgs: props.currentArgs,
		onNavigate: props.onNavigate
	}));
	const permanentQuery = $derived(
		new MediaQuery(props.permanentDrawer ?? '(min-width: 1024px)', props.permanentDrawerFallback ?? false)
	);
	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false);
	let drawerOpen = $state(false);

	const hasDrawer = $derived(props.drawer !== false);
	const permanent = $derived(hasDrawer && permanentQuery.current);
	const modalOpen = $derived(!permanent && drawerOpen);
	const navigationMode = $derived<'menu' | 'up' | 'none'>(
		!navigator.isTopLevel && navigator.canGoBack ? 'up' : permanent || !hasDrawer ? 'none' : 'menu'
	);
	const showFab = $derived(!!props.fab && navigator.destination.fab !== false);

	/** Top-level destinations grouped by their nested graph. */
	const sections = $derived.by(() => {
		const result: ContractNavigationDrawerSection[] = [];
		for (const node of navigator.composite.topLevel()) {
			const ancestors = [];
			for (let parent = node.parent; parent?.parent; parent = parent.parent) ancestors.unshift(parent);
			let target = result;
			let section: ContractNavigationDrawerSection | undefined;
			for (const parent of ancestors) {
				section = target.find((item) => item.label === parent.label);
				if (!section) {
					section = { label: parent.label, icon: parent.destination.icon, iconSvg: parent.destination.iconSvg, destinations: [] };
					target.push(section);
				}
				target = section.sections ??= [];
			}
			if (section) section.destinations.push(node.destination);
			else {
				let unlabelled = result.find((item) => !item.label);
				if (!unlabelled) result.push(unlabelled = { destinations: [] });
				unlabelled.destinations.push(node.destination);
			}
		}
		return result;
	});

	/** Drawer section (nested graph label) of the current fragment, detail screens included. */
	const activeSection = $derived.by(() => {
		let parent = navigator.composite.find(navigator.entry.id)?.parent;
		while (parent?.parent?.parent) parent = parent.parent;
		return parent && parent.parent ? parent.label : undefined;
	});

	const transition = $derived({
		x: navigator.direction === 'forward' ? 24 : navigator.direction === 'back' ? -24 : 0,
		y: navigator.direction === 'replace' ? 8 : 0,
		duration: reducedMotion.current || props.animated === false ? 0 : 220
	});

	const restProps = $derived.by(() => {
		const {
			graph: _graph,
			initial: _initial,
			current: _current,
			currentArgs: _currentArgs,
			heading: _heading,
			permanentDrawer: _permanentDrawer,
			permanentDrawerFallback: _permanentDrawerFallback,
			drawer: _drawer,
			drawerAccordion: _drawerAccordion,
			drawerExpandAll: _drawerExpandAll,
			animated: _animated,
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
		get hasDrawer() {
			return hasDrawer;
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
		get activeSection() {
			return activeSection;
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
