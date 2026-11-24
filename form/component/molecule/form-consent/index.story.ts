import Component from '$stylist/form/component/molecule/form-consent/index.story.svelte';
import type { ContractStory } from '$stylist/html/interface/contract/story';
export default {
	component: Component,
	title: 'form-consent',
	description:
		'Обязательный флажок согласия с произвольным текстом и ссылками на документы. Состояние связывается, чтобы форма могла не пускать к отправке без согласия.',
	args: {}
} satisfies ContractStory<Record<string, never>>;
