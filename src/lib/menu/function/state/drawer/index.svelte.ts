import type { RecipeDrawer } from '$stylist/menu/interface/recipe/drawer';
import { DrawerManager } from '$stylist/menu/class/manager/drawer';

export function createDrawerState(getProps: () => RecipeDrawer) {
	const props = $derived(getProps());
	let drawerEl = $state<HTMLElement | null>(null);
	let backdropEl = $state<HTMLElement | null>(null);
	const isOpen = $derived(props.open ?? false);
	const position = $derived((props.position ?? 'right') as 'left' | 'right' | 'top' | 'bottom');
	const size = $derived(props.size ?? '300px');
	const closable = $derived(props.closable ?? true);
	const showBackdrop = $derived(props.showBackdrop ?? true);

	function closeFn() {
		DrawerManager.close(props, closable);
	}

	function handleBackdropClickFn(e: MouseEvent) {
		DrawerManager.handleBackdropClick(e, backdropEl, closable, closeFn);
	}

	function handleBackdropKeyDownFn(e: KeyboardEvent) {
		DrawerManager.handleBackdropKeyDown(e, backdropEl, closable, closeFn);
	}

	function handleEscapeFn(e: KeyboardEvent) {
		DrawerManager.handleEscape(e, closable, closeFn);
	}

	return {
		get isOpen() {
			return isOpen;
		},
		get drawerEl() {
			return drawerEl;
		},
		set drawerEl(value: HTMLElement | null) {
			drawerEl = value;
		},
		get backdropEl() {
			return backdropEl;
		},
		set backdropEl(value: HTMLElement | null) {
			backdropEl = value;
		},
		get position() {
			return position;
		},
		get size() {
			return size;
		},
		get closable() {
			return closable;
		},
		get showBackdrop() {
			return showBackdrop;
		},
		closeFn,
		handleBackdropClickFn,
		handleBackdropKeyDownFn,
		handleEscapeFn
	};
}

