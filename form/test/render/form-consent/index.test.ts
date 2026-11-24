import { afterEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import Story from '$stylist/form/component/molecule/form-consent/index.story.svelte';
import Honeypot from '$stylist/form/component/atom/form-honeypot/index.svelte';

afterEach(cleanup);

test('consent is a required checkbox whose state the form can bind', async () => {
	render(Story);
	const box = screen.getByRole('checkbox', { name: /согласие на обработку/ }) as HTMLInputElement;
	expect(box.required).toBe(true);
	expect(box.name).toBe('consent');
	expect(screen.getByText('Согласия нет')).toBeTruthy();
	await fireEvent.click(box);
	expect(screen.getByText('Согласие дано')).toBeTruthy();
});

test('honeypot stays out of the tab order and the accessibility tree', () => {
	const { container } = render(Honeypot, { name: 'website' });
	const input = container.querySelector('input[name="website"]') as HTMLInputElement;
	expect(input.tabIndex).toBe(-1);
	expect(input.closest('label')?.getAttribute('aria-hidden')).toBe('true');
	expect(screen.queryByRole('textbox')).toBeNull();
});
