import type { SlotComboboxItem } from '$stylist/control/interface/slot/combobox-item';
import type { RecipeCombobox } from '$stylist/control/interface/recipe/combobox';

export function createComboboxState(getProps: () => RecipeCombobox) {
	const props = $derived(getProps());
	const items = $derived(props.items ?? []);
	const disabled = $derived(props.disabled ?? false);
	const clearable = $derived(props.clearable ?? true);
	const loading = $derived(props.loading ?? false);
	const placeholder = $derived(props.placeholder ?? 'Начните вводить...');
	const emptyText = $derived(props.emptyText ?? 'Ничего не найдено');
	const className = $derived(props.class ?? '');

	let query = $state('');
	let isOpen = $state(false);
	let highlighted = $state(0);
	const inputRef = { current: null as HTMLInputElement | null };

	const selectedItem = $derived(items.find((item) => item.id === props.value) ?? null);

	const filteredItems = $derived.by(() => {
		const text = query.trim().toLowerCase();
		if (!text) return items;
		return items.filter((item) => {
			const haystack = `${item.label} ${item.description ?? ''} ${item.meta ?? ''}`.toLowerCase();
			return haystack.includes(text);
		});
	});

	const hasResults = $derived(filteredItems.length > 0);

	$effect(() => {
		if (!isOpen) {
			const current = selectedItem;
			query = current ? current.label : '';
		}
	});

	function openList() {
		if (disabled) return;
		isOpen = true;
		highlighted = 0;
	}

	function closeList() {
		isOpen = false;
		highlighted = 0;
		const current = selectedItem;
		query = current ? current.label : query;
	}

	function handleInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		query = target.value;
		if (!isOpen) {
			openList();
		}
	}

	function handleFocus() {
		openList();
	}

	function handleBlur(event: FocusEvent) {
		const related = event.relatedTarget as HTMLElement | null;
		if (!related || !related.closest(`[data-combobox="${props.id}"]`)) {
			closeList();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) {
			if (event.key === 'Enter' || event.key === 'ArrowDown') {
				openList();
				event.preventDefault();
			}
			return;
		}

		const options = filteredItems;
		if (!options.length) return;

		if (event.key === 'ArrowDown') {
			highlighted = (highlighted + 1) % options.length;
			event.preventDefault();
		} else if (event.key === 'ArrowUp') {
			highlighted = (highlighted - 1 + options.length) % options.length;
			event.preventDefault();
		} else if (event.key === 'Enter') {
			selectItem(options[highlighted]);
			event.preventDefault();
		} else if (event.key === 'Escape') {
			closeList();
			event.preventDefault();
		}
	}

	function selectItem(item: SlotComboboxItem) {
		if (item.disabled) return;
		props.value = item.id;
		query = item.label;
		closeList();
		inputRef.current?.blur();
	}

	function clearSelection() {
		if (!clearable || disabled) return;
		props.value = undefined;
		query = '';
		inputRef.current?.focus();
		openList();
	}

	return {
		get query() {
			return query;
		},
		set query(v: string) {
			query = v;
		},
		get isOpen() {
			return isOpen;
		},
		get highlighted() {
			return highlighted;
		},
		set highlighted(v: number) {
			highlighted = v;
		},
		get inputRef() {
			return inputRef.current;
		},
		set inputRef(v: HTMLInputElement | null) {
			inputRef.current = v;
		},
		get selectedItem() {
			return selectedItem;
		},
		get filteredItems() {
			return filteredItems;
		},
		get hasResults() {
			return hasResults;
		},
		get disabled() {
			return disabled;
		},
		get clearable() {
			return clearable;
		},
		get loading() {
			return loading;
		},
		get placeholder() {
			return placeholder;
		},
		get emptyText() {
			return emptyText;
		},
		get className() {
			return className;
		},
		openList,
		closeList,
		handleInput,
		handleFocus,
		handleBlur,
		handleKeydown,
		selectItem,
		clearSelection,
		id: props.id,
		label: props.label,
		description: props.description
	};
}
