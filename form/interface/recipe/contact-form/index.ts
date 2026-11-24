import type { HTMLFormAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { ContactFormFeedback } from '$stylist/form/type/object/contact-form-feedback';
import type { ContactFormMessages } from '$stylist/form/type/object/contact-form-messages';

export interface RecipeContactForm extends ComputeIntersectAll<
	[
		Omit<HTMLFormAttributes, 'children'>,
		{
			messages?: Partial<ContactFormMessages>;
		},
		{
			feedback?: ContactFormFeedback | null;
			topicLabel?: string;
			topicValue?: string;
			onClearTopic?: () => void;
			submitting?: boolean;
			initialMessage?: string;
			/** Host integration, e.g. SvelteKit enhance; the component itself is framework-agnostic. */
			formAttachment?: Attachment<HTMLFormElement>;
			consentContent?: Snippet;
			errorDetails?: Snippet;
			footer?: Snippet;
		}
	]
> {}
