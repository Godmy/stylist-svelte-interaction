import { onMount } from 'svelte';
import type { RecipeSchemaFormDialog } from '$stylist/form/interface/recipe/schema-form-dialog';

/** Reactive behavior of schema-form-dialog; props are read lazily when needed. */
export function createSchemaFormDialogComponentState(
	getProps: () => Pick<
		RecipeSchemaFormDialog,
		'isOpen' | 'mode' | 'fields' | 'initialData' | 'onClose' | 'onSave'
	>
) {
	const props = $derived(getProps());
	let formData = $state<Record<string, unknown>>({});
	let isSaving = $state(false);
	let errors = $state<Record<string, string>>({});
	$effect(() => {
		if (props['isOpen']) {
			if (props['mode'] === 'edit' && props['initialData']) {
				formData = { ...props['initialData'] };
			} else {
				const newData: Record<string, unknown> = {};
				props['fields'].forEach((field) => {
					if (!field.primaryKey) {
						newData[field.name] = props['initialData']?.[field.name] ?? '';
					}
				});
				formData = newData;
			}
			errors = {};
		}
	});
	function handleClose() {
		if (!isSaving) {
			props['onClose']();
		}
	}
	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}
	function getInputType(fieldType: string): string {
		const type = fieldType.toLowerCase();
		if (type.includes('int') || type.includes('numeric') || type.includes('decimal'))
			return 'number';
		if (type.includes('bool')) return 'checkbox';
		if (type.includes('date') && !type.includes('timestamp')) return 'date';
		if (type.includes('timestamp') || type.includes('datetime')) return 'datetime-local';
		if (type.includes('text')) return 'textarea';
		return 'text';
	}
	function validateForm(): boolean {
		const newErrors: Record<string, string> = {};
		props['fields'].forEach((field) => {
			if (field.primaryKey && props['mode'] === 'create') return;
			const value = formData[field.name];
			const isEmpty = value === null || value === undefined || value === '';
			if (!field.nullable && isEmpty && !field.default) {
				newErrors[field.name] = 'This field is required';
			}
		});
		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}
	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validateForm()) return;

		isSaving = true;
		try {
			const cleanedData: Record<string, unknown> = {};
			Object.entries(formData).forEach(([key, value]) => {
				const field = props['fields'].find((f) => f.name === key);
				if (value === '' && field?.nullable) {
					cleanedData[key] = null;
				} else if (value !== '' || !field?.nullable) {
					cleanedData[key] = value;
				}
			});
			await props['onSave'](cleanedData);
			handleClose();
		} catch (error) {
			errors._form = error instanceof Error ? error.message : 'Failed to save';
		} finally {
			isSaving = false;
		}
	}
	onMount(() => {
		const handleWindowEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && props['isOpen']) handleClose();
		};
		window.addEventListener('keydown', handleWindowEscape);
		return () => window.removeEventListener('keydown', handleWindowEscape);
	});
	return {
		get formData(): typeof formData {
			return formData;
		},
		set formData(__nextValue: typeof formData) {
			formData = __nextValue;
		},
		get isSaving(): typeof isSaving {
			return isSaving;
		},
		set isSaving(__nextValue: typeof isSaving) {
			isSaving = __nextValue;
		},
		get errors(): typeof errors {
			return errors;
		},
		set errors(__nextValue: typeof errors) {
			errors = __nextValue;
		},
		get handleClose(): typeof handleClose {
			return handleClose;
		},
		get handleBackdropClick(): typeof handleBackdropClick {
			return handleBackdropClick;
		},
		get getInputType(): typeof getInputType {
			return getInputType;
		},
		get handleSubmit(): typeof handleSubmit {
			return handleSubmit;
		}
	};
}
export default createSchemaFormDialogComponentState;
