import { render, cleanup, fireEvent } from '@testing-library/svelte';
import { afterEach, expect, test, vi } from 'vitest';
import Form from '$stylist/form/component/organism/contact-form/index.svelte';
afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});
test('generic contact form keeps editable fields and consent gate without app context', async () => {
	const view = render(Form, {
		initialMessage: 'Hello',
		topicValue: 'work',
		topicLabel: 'Work',
		onClearTopic: vi.fn(),
		feedback: { kind: 'error', message: 'Try again' }
	});
	const submit = view.getByRole('button', { name: 'Send message' });
	expect((submit as HTMLButtonElement).disabled).toBe(true);
	expect((view.getByRole('textbox', { name: 'Your message' }) as HTMLTextAreaElement).value).toBe(
		'Hello'
	);
	await fireEvent.click(view.getByRole('checkbox'));
	expect((submit as HTMLButtonElement).disabled).toBe(false);
	expect(view.getByRole('alert').textContent).toContain('Try again');
});

test('multiple forms have distinct field identifiers and clean host attachments', () => {
	const dispose = vi.fn(),
		attach = vi.fn(() => dispose);
	const first = render(Form, { formAttachment: attach }),
		second = render(Form, {});
	const one = first.container.querySelector('textarea')!.id,
		two = second.container.querySelector('textarea')!.id;
	expect(one).not.toBe(two);
	expect(first.container.querySelector(`label[for="${one}"]`)).not.toBeNull();
	expect(attach).toHaveBeenCalledTimes(1);
	first.unmount();
	expect(dispose).toHaveBeenCalledTimes(1);
});
