import type { RecipePagination } from '$stylist/navigation/interface/recipe/pagination';

export function createPaginationState(getProps: () => RecipePagination) {
	const props = $derived(getProps());
	// Props with defaults
	const currentPage = $derived(props.currentPage ?? 1);
	const totalPages = $derived(props.totalPages ?? 1);
	const showFirstLast = $derived(props.showFirstLast ?? true);
	const showPrevNext = $derived(props.showPrevNext ?? true);
	const showDots = $derived(props.showDots ?? true);
	const maxVisible = $derived(props.maxVisible ?? 5);
	const size = $derived(props.size ?? 'md');
	const disabled = $derived(props.disabled ?? false);
	const containerClass = $derived(props.class == null ? undefined : String(props.class));
	const navClass = $derived('pagination__nav');
	const buttonClassComputed = $derived(props.buttonClass ?? 'pagination__button');
	const activeButtonClassComputed = $derived(
		props.activeButtonClass ?? 'pagination__button--active'
	);
	const disabledButtonClassComputed = $derived(
		props.disabledButtonClass ?? 'pagination__button--disabled'
	);
	const iconButtonClass = $derived('pagination__icon-button');
	const dotsClass = $derived('pagination__dots');

	// Computed classes

	// Calculate visible page range
	function getVisiblePages(): number[] {
		// Ensure maxVisible is odd so we can have a symmetric range around current page
		const visibleCount = maxVisible % 2 === 0 ? maxVisible + 1 : maxVisible;
		const half = Math.floor(visibleCount / 2);

		let start = Math.max(1, currentPage - half);
		let end = Math.min(totalPages, currentPage + half);

		// Adjust the range if it's near the beginning or end
		if (end - start + 1 < visibleCount) {
			if (start === 1) {
				end = Math.min(totalPages, start + visibleCount - 1);
			} else if (end === totalPages) {
				start = Math.max(1, end - visibleCount + 1);
			}
		}

		const pages = [];
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	}

	// Navigation methods
	function goToPage(page: number): void {
		if (page < 1 || page > totalPages || page === currentPage || disabled) return;

		if (props.onPageChange) {
			props.onPageChange(page);
		}
	}

	function goToFirst(): void {
		goToPage(1);
	}

	function goToLast(): void {
		goToPage(totalPages);
	}

	function goToPrev(): void {
		goToPage(currentPage - 1);
	}

	function goToNext(): void {
		goToPage(currentPage + 1);
	}

	// Rest props
	const restProps = $derived.by(() => {
		const {
			class: _class,
			currentPage: _currentPage,
			totalPages: _totalPages,
			showFirstLast: _showFirstLast,
			showPrevNext: _showPrevNext,
			showDots: _showDots,
			maxVisible: _maxVisible,
			size: _size,
			disabled: _disabled,
			buttonClass: _buttonClass,
			activeButtonClass: _activeButtonClass,
			disabledButtonClass: _disabledButtonClass,
			onPageChange: _onPageChange,
			...rest
		} = props;
		return rest;
	});

	return {
		get currentPage() {
			return currentPage;
		},
		get totalPages() {
			return totalPages;
		},
		get showFirstLast() {
			return showFirstLast;
		},
		get showPrevNext() {
			return showPrevNext;
		},
		get showDots() {
			return showDots;
		},
		get maxVisible() {
			return maxVisible;
		},
		get disabled() {
			return disabled;
		},
		get containerClass() {
			return containerClass;
		},
		get navClass() {
			return navClass;
		},
		get buttonClassComputed() {
			return buttonClassComputed;
		},
		get activeButtonClassComputed() {
			return activeButtonClassComputed;
		},
		get disabledButtonClassComputed() {
			return disabledButtonClassComputed;
		},
		get iconButtonClass() {
			return iconButtonClass;
		},
		get dotsClass() {
			return dotsClass;
		},
		get restProps() {
			return restProps;
		},
		getVisiblePages,
		goToPage,
		goToFirst,
		goToLast,
		goToPrev,
		goToNext
	};
}
