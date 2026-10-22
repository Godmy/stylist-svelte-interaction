import WhatsappButton from '$stylist/button/component/atom/whatsapp-button/index.svelte';
import type { RecipeWhatsappButton } from '$stylist/button/interface/recipe/whatsapp-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** WhatsApp `wa.me` deep link styled as a button. */
export default {
	component: WhatsappButton,
	title: 'WhatsappButton',
	description: 'wa.me deep link styled as a button — digits-only phone, optional pre-filled text.',
	args: { phone: '+94761333615', text: '', variant: 'primary', size: 'md', label: 'WhatsApp' },
	controls: {
		phone: { type: 'text' },
		text: { type: 'text' },
		variant: { type: 'select', options: ['primary', 'secondary', 'plain'] },
		// sm … lg: the size tokens the WhatsApp button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		label: { type: 'text' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeWhatsappButton>;
