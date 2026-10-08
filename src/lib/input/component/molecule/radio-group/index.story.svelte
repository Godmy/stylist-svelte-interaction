<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';
	import RadioGroup from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'label',
			type: 'text' as TokenControllerType,
			defaultValue: 'Р’С‹Р±РµСЂРёС‚Рµ РїР»Р°РЅ',
			description: 'Label for the radio group'
		},
		{
			name: 'description',
			type: 'text' as TokenControllerType,
			defaultValue: 'РћРїСЂРµРґРµР»РёС‚Рµ РїРѕРґС…РѕРґСЏС‰РёР№ С‚Р°СЂРёС„ РґР»СЏ РєРѕРјР°РЅРґС‹.',
			description: 'Description for the radio group'
		},
		{
			name: 'value',
			type: 'select' as TokenControllerType,
			defaultValue: 'pro',
			options: ['starter', 'pro', 'enterprise'],
			description: 'Selected value'
		},
		{
			name: 'orientation',
			type: 'select' as TokenControllerType,
			defaultValue: TOKEN_ORIENTATION[1],
			options: TOKEN_ORIENTATION,
			description: 'Orientation of the radio group'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the radio group is disabled'
		},
		{
			name: 'required',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether the radio group is required'
		},
		{
			name: 'showError',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether to show error state'
		}
	];

	const options = [
		{
			value: 'starter',
			label: 'Starter',
			description: 'Р‘Р°Р·РѕРІС‹Рµ С„СѓРЅРєС†РёРё РґР»СЏ РјР°Р»РѕРіРѕ РїСЂРѕРµРєС‚Р°.'
		},
		{
			value: 'pro',
			label: 'Pro',
			description:
				'РџСЂРѕРґРІРёРЅСѓС‚С‹Рµ РёРЅСЃС‚СЂСѓРјРµРЅС‚С‹ РґР»СЏ РєРѕРјР°РЅРґ СЃСЂРµРґРЅРµР№ РІРµР»РёС‡РёРЅС‹.'
		},
		{
			value: 'enterprise',
			label: 'Enterprise',
			description: 'Р Р°СЃС€РёСЂРµРЅРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё Рё РїРѕРґРґРµСЂР¶РєР° 24/7.',
			disabled: false
		}
	];
</script>

<Story
	{controls}
	title="RadioGroup Component"
	description="Р“СЂСѓРїРїР° СЂР°РґРёРѕРєРЅРѕРїРѕРє СЃ РѕРїРёСЃР°РЅРёРµРј Рё РїРѕРґРґРµСЂР¶РєРѕР№ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅРѕРіРѕ СЂРµР¶РёРјР°"
>
	{#snippet children(controlValues: any)}
		<RadioGroup
			name="plan-choice"
			label={controlValues.label}
			description={controlValues.description}
			{options}
			orientation={controlValues.orientation}
			value={controlValues.value}
			disabled={controlValues.disabled}
			required={controlValues.required}
			error={controlValues.showError ? 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІС‹Р±РµСЂРёС‚Рµ С‚Р°СЂРёС„.' : ''}
		/>
	{/snippet}
</Story>
