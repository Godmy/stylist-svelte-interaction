import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeComponentInfoCard } from '$stylist/dialog/interface/recipe/component-info-card';
export function createComponentInfoCardState(
	getProps: () => RecipeComponentInfoCard & HTMLAttributes<HTMLDivElement>
) {
	const props = $derived(getProps());
	const componentName = $derived(props.componentName ?? '');
	const category = $derived(props.category ?? '');
	const subcategory = $derived(props.subcategory ?? '');
	const description = $derived(
		props.description ??
			'A flexible and customizable UI component designed for modern web applications.'
	);
	const propsCount = $derived(props.propsCount ?? 0);
	const examples = $derived(
		props.examples ?? [
			'Basic usage with default props',
			'Custom styling and theming',
			'Advanced interactions and states',
			'Responsive behavior across devices'
		]
	);
	const npmPackage = $derived(props.npmPackage ?? '@stylist-svelte/components');
	const version = $derived(props.version ?? '1.0.0');
	const author = $derived(props.author ?? 'RecipeStylist Team');
	const lastUpdated = $derived(props.lastUpdated ?? '2025-01-13');
	const isOpen = $derived(props.isOpen ?? true);
	const onClose = $derived(props.onClose ?? (() => {}));

	let copySuccess = $state(false);

	async function copyNpmCommand() {
		try {
			await navigator.clipboard.writeText(`npm install ${npmPackage}`);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function handleClose() {
		onClose();
	}

	return {
		get componentName() {
			return componentName;
		},
		get category() {
			return category;
		},
		get subcategory() {
			return subcategory;
		},
		get description() {
			return description;
		},
		get propsCount() {
			return propsCount;
		},
		get examples() {
			return examples;
		},
		get npmPackage() {
			return npmPackage;
		},
		get version() {
			return version;
		},
		get author() {
			return author;
		},
		get lastUpdated() {
			return lastUpdated;
		},
		get isOpen() {
			return isOpen;
		},
		get copySuccess() {
			return copySuccess;
		},
		copyNpmCommand,
		handleClose
	};
}
