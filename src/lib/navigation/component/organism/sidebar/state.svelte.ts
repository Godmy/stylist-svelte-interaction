import type { NavItem } from '$stylist/navigation/interface/slot/nav-item';
import type { RecipeSidebar } from '$stylist/navigation/interface/recipe/sidebar';

export function createSidebarState(getProps: () => RecipeSidebar) {
	const props = $derived(getProps());
	// SlotState
	let isMobile = $state(false);
	let isSidebarOpen = $state(!props.collapsed);

	// Props with defaults
	const items = $derived(props.items ?? []);
	const title = $derived(props.title ?? 'Navigation');
	const collapsed = $derived(props.collapsed ?? false);
	const collapsible = $derived(props.collapsible ?? true);
	const mobileBreakpoint = $derived(props.mobileBreakpoint ?? 768);
	const width = $derived(props.width ?? '280px');
	const mobileWidth = $derived(props.mobileWidth ?? '280px');
	const disabled = $derived(props.disabled ?? false);
	const hostClass = $derived(`sidebar__host ${props.class ?? ''}`.trim());
	const mobileButtonClass = $derived('sidebar__mobile-button');
	const overlayClass = $derived('sidebar__overlay');
	const sidebarClass = $derived('sidebar__sidebar');
	const sidebarContainerClass = $derived('sidebar__sidebar-container');
	const headerClass = $derived('sidebar__header');
	const logoWrapperClass = $derived(props.logoClass ?? 'sidebar__logo-wrapper');
	const titleClassComputed = $derived(props.titleClass ?? 'sidebar__title');
	const navClassComputed = $derived(props.navClass ?? 'sidebar__nav');
	const navListClass = $derived('sidebar__nav-list');
	const footerClassComputed = $derived(props.footerClass ?? 'sidebar__footer');
	const contentAreaClass = $derived('sidebar__content-area');
	const navItemIconWrapperClass = $derived('sidebar__nav-item-icon-wrapper');
	const navItemLabelClass = $derived('sidebar__nav-item-label');
	const navItemBadgeClass = $derived('sidebar__nav-item-badge');

	function getNavItemClass(item: NavItem): string {
		return [
			'sidebar__nav-item',
			item.active ? 'sidebar__nav-item--active' : '',
			item.disabled || disabled ? 'sidebar__nav-item--disabled' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	// Handle window resize to detect mobile view
	$effect(() => {
		const handleResize = () => {
			isMobile = window.innerWidth < mobileBreakpoint;
			if (isMobile) {
				isSidebarOpen = false;
			} else {
				isSidebarOpen = !collapsed;
			}
		};

		// Initial check
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	// Sync with collapsed prop
	$effect(() => {
		if (!isMobile) {
			isSidebarOpen = !collapsed;
		}
	});

	// Computed classes
	const sidebarStyle = $derived(
		`width: ${isMobile ? mobileWidth : width}; transform: ${isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};`
	);

	// Methods
	function toggleSidebar(): void {
		isSidebarOpen = !isSidebarOpen;
	}

	function handleClick(item: NavItem): void {
		if (item.disabled || disabled) return;

		if (item.onClick) {
			item.onClick();
		} else if (item.href) {
			window.location.href = item.href;
		}
	}

	// Rest props
	const restProps = $derived.by(() => {
		const {
			class: _class,
			items: _items,
			title: _title,
			logo: _logo,
			footer: _footer,
			collapsed: _collapsed,
			collapsible: _collapsible,
			mobileBreakpoint: _mobileBreakpoint,
			width: _width,
			mobileWidth: _mobileWidth,
			position: _position,
			disabled: _disabled,
			navClass: _navClass,
			itemClass: _itemClass,
			activeItemClass: _activeItemClass,
			disabledItemClass: _disabledItemClass,
			titleClass: _titleClass,
			logoClass: _logoClass,
			footerClass: _footerClass,
			...rest
		} = props;
		return rest;
	});

	return {
		get isMobile() {
			return isMobile;
		},
		get isSidebarOpen() {
			return isSidebarOpen;
		},
		get items() {
			return items;
		},
		get title() {
			return title;
		},
		get collapsed() {
			return collapsed;
		},
		get collapsible() {
			return collapsible;
		},
		get mobileBreakpoint() {
			return mobileBreakpoint;
		},
		get width() {
			return width;
		},
		get mobileWidth() {
			return mobileWidth;
		},
		get disabled() {
			return disabled;
		},
		get hostClass() {
			return hostClass;
		},
		get mobileButtonClass() {
			return mobileButtonClass;
		},
		get overlayClass() {
			return overlayClass;
		},
		get sidebarClass() {
			return sidebarClass;
		},
		get sidebarStyle() {
			return sidebarStyle;
		},
		get sidebarContainerClass() {
			return sidebarContainerClass;
		},
		get headerClass() {
			return headerClass;
		},
		get logoWrapperClass() {
			return logoWrapperClass;
		},
		get titleClassComputed() {
			return titleClassComputed;
		},
		get navClassComputed() {
			return navClassComputed;
		},
		get navListClass() {
			return navListClass;
		},
		get footerClassComputed() {
			return footerClassComputed;
		},
		get contentAreaClass() {
			return contentAreaClass;
		},
		get navItemIconWrapperClass() {
			return navItemIconWrapperClass;
		},
		get navItemLabelClass() {
			return navItemLabelClass;
		},
		get navItemBadgeClass() {
			return navItemBadgeClass;
		},
		get restProps() {
			return restProps;
		},
		toggleSidebar,
		handleClick,
		getNavItemClass
	};
}
