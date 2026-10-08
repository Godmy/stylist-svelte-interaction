<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import WhatsappButton from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'phone', type: 'text', defaultValue: '+94761333615' },
		{ name: 'text', type: 'text', defaultValue: '' },
		{
			name: 'variant',
			type: 'select',
			options: ['primary', 'secondary', 'plain'],
			defaultValue: 'primary'
		},
		{ name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
		{ name: 'label', type: 'text', defaultValue: 'WhatsApp' }
	];
</script>

<Story
	{controls}
	component={WhatsappButton}
	title="WhatsappButton"
	category="Atoms/Button"
	description="wa.me deep link styled as a button — digits-only phone, optional pre-filled text."
	tags={['button', 'whatsapp', 'contact']}
/>
