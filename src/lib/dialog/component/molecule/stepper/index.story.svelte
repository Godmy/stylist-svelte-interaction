<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Stepper from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'orientation',
			type: 'select',
			defaultValue: 'horizontal',
			options: ['horizontal', 'vertical']
		}
	];
</script>

<Story
	component={Stepper}
	title="Stepper"
	description="Step progress indicator for multi-step flows."
	{controls}
>
	{#snippet children(values: any)}
		<Stepper
			orientation={values.orientation}
			steps={[
				{ id: '1', title: 'Account', description: 'Create profile', status: 'completed' },
				{ id: '2', title: 'Plan', description: 'Choose subscription', status: 'current' },
				{ id: '3', title: 'Checkout', description: 'Confirm payment', status: 'upcoming' }
			]}
		/>
	{/snippet}
</Story>
