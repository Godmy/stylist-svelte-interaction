import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import MonthRangePicker from '$stylist/calendar/component/molecule/month-range-picker/index.svelte';

describe('month range picker', () => {
	it('shows a whole month by name and steps months across a year', async () => {
		const onChange = vi.fn();
		render(MonthRangePicker, { from: '2026-12-01', to: '2026-12-31', onChange });
		expect(screen.getByRole('button', { expanded: false }).textContent).toBe('декабрь 2026 г.');

		await fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
		expect(onChange).toHaveBeenLastCalledWith({ from: '2027-01-01', to: '2027-01-31' });
		await fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
		expect(onChange).toHaveBeenLastCalledWith({ from: '2026-11-01', to: '2026-11-30' });
	});

	it('shows a typed range as two dates and applies a new one in order', async () => {
		const onChange = vi.fn();
		render(MonthRangePicker, {
			from: '2026-02-10',
			to: '2026-03-05',
			onChange,
			applyLabel: 'Show'
		});
		const summary = screen.getByRole('button', { expanded: false });
		expect(summary.textContent).toBe('10.02.2026 – 05.03.2026');

		await fireEvent.click(summary);
		const from = screen.getByLabelText('From') as HTMLInputElement;
		const to = screen.getByLabelText('To') as HTMLInputElement;
		await fireEvent.input(from, { target: { value: '2026-04-20' } });
		await fireEvent.input(to, { target: { value: '2026-04-02' } });
		await fireEvent.click(screen.getByRole('button', { name: 'Show' }));
		expect(onChange).toHaveBeenLastCalledWith({ from: '2026-04-02', to: '2026-04-20' });
		expect(screen.queryByLabelText('From')).toBeNull();
	});
});
