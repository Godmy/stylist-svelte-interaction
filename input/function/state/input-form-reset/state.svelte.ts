/** Keep a collection's bound value in sync with its native controls after form reset. */
export function createInputFormReset(
	getElement: () => HTMLElement | undefined,
	onReset: (element: HTMLElement) => void,
	getFormId?: () => string | null | undefined
) {
	$effect(() => {
		const element = getElement();
		if (!element) return;
		const formId = getFormId?.();
		const form = formId
			? document.getElementById(formId)
			: element instanceof HTMLFieldSetElement
				? element.form
				: element.closest('form');
		if (!(form instanceof HTMLFormElement)) return;
		const pending: ReturnType<typeof setTimeout>[] = [];
		const reset = (event: Event) => {
			// A microtask may run between listeners of a trusted event, before a later
			// listener cancels reset. Wait until the complete dispatch has finished.
			const timer = setTimeout(() => {
				pending.splice(pending.indexOf(timer), 1);
				if (!event.defaultPrevented && element.isConnected) onReset(element);
			}, 0);
			pending.push(timer);
		};
		form.addEventListener('reset', reset);
		return () => {
			form.removeEventListener('reset', reset);
			for (const timer of pending) clearTimeout(timer);
		};
	});
}
