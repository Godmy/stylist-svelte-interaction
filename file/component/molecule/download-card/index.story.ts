import DownloadCard from '$stylist/file/component/molecule/download-card/index.svelte';
import type { RecipeDownloadCard } from '$stylist/file/interface/recipe/download-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** Download action card for files and resources. */
export default {
	component: DownloadCard,
	title: 'DownloadCard',
	description: 'Download action card for files and resources.',
	args: {
		file: { name: 'Product Brochure.pdf', size: 2457600, type: 'PDF', date: '2026-02-21' },
		downloadUrl: '#',
		variant: 'primary',
		showMetadata: true
	},
	controls: {
		variant: { type: 'select', options: TOKEN_COLOR_TONE },
		showMetadata: { type: 'boolean' },
		icon: { type: 'text' },
		iconAlt: { type: 'text' }
	}
} satisfies ContractStory<RecipeDownloadCard>;
