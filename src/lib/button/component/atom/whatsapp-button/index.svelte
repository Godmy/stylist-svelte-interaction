<script lang="ts">
	import type { RecipeWhatsappButton } from '$stylist/button/interface/recipe/whatsapp-button';

	let {
		phone,
		text = undefined,
		variant = 'primary',
		size = 'md',
		label = 'WhatsApp',
		class: className = ''
	}: RecipeWhatsappButton = $props();

	/** Builds a `wa.me` deep link — digits-only phone, optional pre-filled text. */
	function whatsappLink(phoneNumber: string, message?: string): string {
		const digits = phoneNumber.replace(/\D/g, '');
		const query = message ? `?text=${encodeURIComponent(message)}` : '';
		return `https://wa.me/${digits}${query}`;
	}
</script>

<a
	class={['c-whatsapp-button', variant, size, className].filter(Boolean).join(' ')}
	href={whatsappLink(phone, text)}
	target="_blank"
	rel="noopener"
>
	<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<path
			fill="currentColor"
			d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.83 1.23h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.87 9.87 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.82-3.01-.2-.31a8.17 8.17 0 0 1-1.26-4.35c0-4.55 3.71-8.26 8.27-8.26 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.55-3.71 8.26-8.27 8.26Zm4.53-6.18c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.48-.01c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z"
		/>
	</svg>
	<span>{label}</span>
</a>

<style>
	.c-whatsapp-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-weight: 600;
		line-height: 1;
		border-radius: var(--radius, 0.5rem);
		border: 1px solid transparent;
		text-decoration: none;
		white-space: nowrap;
		transition:
			background-color 0.15s ease,
			box-shadow 0.15s ease;
	}
	.c-whatsapp-button:hover {
		text-decoration: none;
	}
	.c-whatsapp-button svg {
		width: 1.15em;
		height: 1.15em;
		flex: none;
	}
	.sm {
		padding: 0.5rem 0.85rem;
		font-size: 0.85rem;
	}
	.md {
		padding: 0.65rem 1.1rem;
		font-size: 1rem;
	}
	.lg {
		padding: 0.95rem 1.6rem;
		font-size: 1.125rem;
	}
	.primary {
		background: #25d366;
		color: #05391a;
	}
	.primary:hover {
		box-shadow: var(--shadow-md, 0 4px 14px rgb(0 0 0 / 0.12));
	}
	.secondary {
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary, #111);
		border-color: var(--color-border-primary, #d1d5db);
	}
	.plain {
		padding-inline: 0;
		color: var(--color-text-primary, #111);
	}
</style>
