import type { RecipeDropdownMenu } from '$stylist/menu/interface/recipe/dropdown-menu';

export function createDropdownMenuState(getProps: () => RecipeDropdownMenu) {
	const props = $derived(getProps());
	const normalizedPosition = $derived(
		props.position === 'right' ? 'right' : props.position === 'center' ? 'center' : 'left'
	);
	let isOpen = $state(false);
	const dropdownId = $derived(`dropdown-${Math.random().toString(36).substr(2, 9)}`);
	const classes = $derived(['c-dropdown', props.class].filter(Boolean).join(' '));
	const menuClasses = $derived(
		['c-dropdown__menu', `c-dropdown__menu--${normalizedPosition}`].join(' ')
	);
	const chevronClass = $derived(
		['c-dropdown__chevron', isOpen ? 'c-dropdown__chevron--open' : ''].filter(Boolean).join(' ')
	);

	$effect(() => {
		const handleClickOutside = (event: Event) => {
			if (
				isOpen &&
				!event.composedPath().some((el) => el instanceof Element && el.id === dropdownId)
			) {
				isOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function toggleDropdown() {
		if (!props.disabled) {
			isOpen = !isOpen;
		}
	}

	function closeDropdown() {
		isOpen = false;
	}

	return {
		get isOpen() {
			return isOpen;
		},
		get dropdownId() {
			return dropdownId;
		},
		get classes() {
			return classes;
		},
		get menuClasses() {
			return menuClasses;
		},
		get chevronClass() {
			return chevronClass;
		},
		toggleDropdown,
		closeDropdown
	};
}
