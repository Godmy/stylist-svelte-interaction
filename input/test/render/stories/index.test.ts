import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import type { Component } from 'svelte';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import StoryCanvas from '$stylist/domain/component/molecule/story-canvas/index.svelte';

afterEach(cleanup);

describe('input story contracts', () => {
	const stories = import.meta.glob<ContractStory>('../../../component/**/index.story.ts', {
		eager: true,
		import: 'default'
	});
	const renders = import.meta.glob<Component>('../../../component/**/index.story.svelte', {
		eager: true,
		import: 'default'
	});
	it('keeps exactly the 22 retained families', () => expect(Object.keys(stories)).toHaveLength(22));
	it.each(Object.entries(stories))(
		'%s clones and mounts every preset and its custom render',
		async (path, story) => {
			const custom = renders[path.replace(/\.ts$/, '.svelte')] ?? null;
			const view = render(StoryCanvas, { story, render: custom });
			for (const preset of [{}, ...Object.values(story.presets ?? {})]) {
				const args = structuredClone({ ...story.args, ...preset });
				await view.rerender({ story, args, render: custom });
				expect(view.container.querySelector('.c-story-canvas')?.firstElementChild).toBeTruthy();
			}
		}
	);
});
