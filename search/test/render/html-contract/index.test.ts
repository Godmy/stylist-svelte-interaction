import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
import SearchField from '$stylist/search/component/atom/search-field/index.svelte';
import SearchToggle from '$stylist/search/component/atom/search-toggle/index.svelte';
import SearchSuggestion from '$stylist/search/component/atom/search-suggestion/index.svelte';
import SearchBar from '$stylist/search/component/molecule/search-bar/index.svelte';
import SearchOverlay from '$stylist/search/component/molecule/search-overlay/index.svelte';
import SearchForm from '$stylist/search/component/organism/search-form/index.svelte';
import AutoComplete from '$stylist/search/component/organism/auto-complete/index.svelte';
import SearchResults from '$stylist/search/component/organism/search-results/index.svelte';

afterEach(() => {
	cleanup();
	vi.useRealTimers();
});

const fruits = [
	{ id: '1', label: 'Apple', value: 'apple' },
	{ id: '2', label: 'Banana', value: 'banana' },
	{ id: '3', label: 'Cherry', value: 'cherry' }
];

describe('search compositions keep the html search contract', () => {
	it.each([SearchBar, SearchForm, SearchOverlay])(
		// jsdom has no implicit role for <search> yet, so the element itself is asserted.
		'renders a <search> landmark that owns its skin scope',
		(component) => {
			const view = render(component, {});
			const root = view.container.querySelector('search')!;
			expect(root).not.toBeNull();
			expect(root.matches(SEARCH_SKIN_SCOPE)).toBe(true);
			expect(root.tagName).toBe('SEARCH');
		}
	);

	it.each([SearchField, SearchBar, SearchForm, AutoComplete, SearchResults, SearchSuggestion])(
		'installs one scoped html skin, and none with skin=false',
		async (component) => {
			const view = render(component, { skin: true });
			const sheets = () =>
				[...document.head.querySelectorAll('style')].filter((style) =>
					style.textContent?.includes(`:where(${SEARCH_SKIN_SCOPE})`)
				);
			expect(sheets()).toHaveLength(1);
			expect(view.container.querySelectorAll(SEARCH_SKIN_SCOPE)).toHaveLength(1);
			await view.rerender({ skin: false });
			expect(sheets()).toHaveLength(0);
			expect(view.container.querySelector(SEARCH_SKIN_SCOPE)).toBeNull();
		}
	);

	it('renders a native search input that forwards attributes and events', async () => {
		const oninput = vi.fn();
		const onValueInput = vi.fn();
		const view = render(SearchField, {
			name: 'q',
			required: true,
			'data-consumer': 'kept',
			placeholder: 'Find',
			oninput,
			onValueInput
		});
		const input = view.getByRole('searchbox') as HTMLInputElement;
		expect(input.type).toBe('search');
		expect(input.name).toBe('q');
		expect(input.required).toBe(true);
		expect(input.dataset.consumer).toBe('kept');
		expect(input.getAttribute('aria-label')).toBe('Find');
		await fireEvent.input(input, { target: { value: 'tok' } });
		expect(oninput).toHaveBeenCalledOnce();
		expect(onValueInput).toHaveBeenCalledWith('tok');
	});

	it('leaves the accessible name to an associated label', () => {
		const view = render(SearchField, { id: 'site-search', placeholder: 'Find' });
		expect(view.getByRole('searchbox').hasAttribute('aria-label')).toBe(false);
	});

	it('clears on Escape, then reports clear and escape', async () => {
		const onClear = vi.fn();
		const onEscape = vi.fn();
		const view = render(SearchField, { value: 'tok', onClear, onEscape });
		const input = view.getByRole('searchbox') as HTMLInputElement;
		await fireEvent.keyDown(input, { key: 'Escape' });
		expect(input.value).toBe('');
		expect(onClear).toHaveBeenCalledOnce();
		expect(onEscape).toHaveBeenCalledOnce();
	});

	it('discloses its region with aria-expanded', async () => {
		const onToggle = vi.fn();
		const view = render(SearchToggle, { open: false, onToggle });
		const button = view.getByRole('button', { name: 'Open search' });
		expect(button.getAttribute('type')).toBe('button');
		expect(button.getAttribute('aria-expanded')).toBe('false');
		await fireEvent.click(button);
		expect(onToggle).toHaveBeenCalledOnce();
		await view.rerender({ open: true });
		expect(button.getAttribute('aria-expanded')).toBe('true');
		expect(button.getAttribute('aria-label')).toBe('Close search');
	});

	it('submits one named query natively, or hands it to onSearch', async () => {
		const view = render(SearchForm, { query: 'tokens', action: '/find' });
		const form = view.container.querySelector('form')!;
		expect(form.closest('search')).not.toBeNull();
		expect(form.getAttribute('method')).toBe('get');
		expect(form.getAttribute('action')).toBe('/find');
		expect(new FormData(form).get('q')).toBe('tokens');
		expect(view.getByRole('button', { name: 'Search' }).getAttribute('type')).toBe('submit');

		const onSearch = vi.fn();
		await view.rerender({ onSearch });
		const submit = new Event('submit', { cancelable: true });
		form.dispatchEvent(submit);
		expect(submit.defaultPrevented).toBe(true);
		expect(onSearch).toHaveBeenCalledWith('tokens');
	});

	it('debounces onSearch, searches on Enter and clears with the button', async () => {
		vi.useFakeTimers();
		const onSearch = vi.fn();
		const onClear = vi.fn();
		const view = render(SearchBar, { debounceMs: 200, onSearch, onClear });
		const input = view.getByRole('searchbox') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: 'inv' } });
		expect(onSearch).not.toHaveBeenCalled();
		vi.advanceTimersByTime(200);
		expect(onSearch).toHaveBeenLastCalledWith('inv');
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(onSearch).toHaveBeenCalledTimes(2);
		await fireEvent.click(view.getByRole('button', { name: 'Clear search' }));
		expect(input.value).toBe('');
		expect(onClear).toHaveBeenCalledOnce();
		expect(onSearch).toHaveBeenLastCalledWith('');
		vi.advanceTimersByTime(500);
		expect(onSearch).toHaveBeenCalledTimes(3);
	});

	it('follows the ARIA combobox pattern', async () => {
		const onSelect = vi.fn();
		const view = render(AutoComplete, { options: fruits, onSelect });
		const input = view.getByRole('combobox') as HTMLInputElement;
		const listbox = view.getByRole('listbox', { hidden: true });
		expect(input.getAttribute('aria-controls')).toBe(listbox.id);
		expect(input.getAttribute('aria-expanded')).toBe('false');

		await fireEvent.input(input, { target: { value: 'an' } });
		expect(input.getAttribute('aria-expanded')).toBe('true');
		expect(view.getAllByRole('option').map((option) => option.textContent?.trim())).toEqual([
			'Banana'
		]);
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		expect(input.getAttribute('aria-activedescendant')).toBe(view.getByRole('option').id);
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(onSelect).toHaveBeenCalledWith(fruits[1]);
		expect(input.value).toBe('Banana');
		expect(input.getAttribute('aria-expanded')).toBe('false');
	});

	it('keeps the query on Escape while the list is open, clears it after', async () => {
		const view = render(AutoComplete, { options: fruits, value: 'ch' });
		const input = view.getByRole('combobox') as HTMLInputElement;
		await fireEvent.focus(input);
		expect(input.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.keyDown(input, { key: 'Escape' });
		expect(input.getAttribute('aria-expanded')).toBe('false');
		expect(input.value).toBe('ch');
		await fireEvent.keyDown(input, { key: 'Escape' });
		expect(input.value).toBe('');
	});

	it('opens the field, renders results for a query and closes on Escape', async () => {
		const view = render(SearchOverlay, { open: false });
		expect(view.queryByRole('searchbox')).toBeNull();
		await fireEvent.click(view.getByRole('button', { name: 'Open search' }));
		const input = view.getByRole('searchbox') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: 'tok' } });
		await fireEvent.keyDown(input, { key: 'Escape' });
		expect(view.queryByRole('searchbox')).toBeNull();
		expect(view.getByRole('button', { name: 'Open search' }).getAttribute('aria-expanded')).toBe(
			'false'
		);
	});

	it('lists results and suggestions as buttons in a list, with status states', async () => {
		const onResultClick = vi.fn();
		const result = { id: '1', type: 'document' as const, title: 'Invoice' };
		const view = render(SearchResults, { results: [result], query: 'inv', onResultClick });
		await fireEvent.click(view.getByRole('button', { name: /Invoice/ }));
		expect(onResultClick).toHaveBeenCalledWith(result);
		expect(view.getByRole('list')).not.toBeNull();
		await view.rerender({ results: [], query: 'zzz' });
		expect(view.getByRole('status').textContent).toContain('zzz');

		cleanup();
		const onValueChange = vi.fn();
		const suggestion = { id: 's', text: 'Analytics' };
		const list = render(SearchSuggestion, { suggestions: [suggestion], onValueChange });
		await fireEvent.click(list.getByRole('button', { name: 'Analytics' }));
		expect(onValueChange).toHaveBeenCalledWith(suggestion);
		await list.rerender({ loading: true });
		expect(list.getByRole('status').textContent).toContain('Loading');
	});
});
