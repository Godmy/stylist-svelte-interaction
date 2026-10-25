import type { TokenIconName } from '$stylist/svg/type/alias/icon-name';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
export interface SlotAccordionLayout extends HTMLAttributes<HTMLDivElement> {
	value: string;
	title: string;
	/** Optional icon before the heading. */
	icon?: TokenIconName;
	/** Trusted inline SVG, rendered without an asynchronous name lookup. */
	iconSvg?: string;
	/** Keep the panel expanded regardless of the accordion's selection. */
	alwaysOpen?: boolean;
	/** Мелкая строка под title (подсказка или выбранное значение). */
	subtitle?: string;
	children?: Snippet;
	/** Доп. содержимое в заголовке после title, перед шевроном (например, иконки-бейджи выбранных значений). */
	headerEnd?: Snippet;
	disabled?: boolean;
	class?: string;
}
