import Component from '$stylist/form/component/atom/form-honeypot/index.svelte';
import type { RecipeFormHoneypot } from '$stylist/form/interface/recipe/form-honeypot';
import type { ContractStory } from '$stylist/html/interface/contract/story';
export default {
	component: Component,
	title: 'form-honeypot',
	description:
		'Скрытое поле-ловушка для ботов. На экране ничего нет: поле убрано за край, сервер отклоняет заявки, где оно заполнено.',
	args: { name: 'website', label: 'Не заполняйте это поле' }
} satisfies ContractStory<RecipeFormHoneypot>;
