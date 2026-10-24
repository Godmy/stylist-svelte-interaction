import { describe, expect, it } from 'vitest';
import { fileManagerFilter } from '$stylist/file/function/transform/file-manager-filter';
import { FILE_MANAGER_SAMPLE } from '$stylist/file/const/array/file-manager-sample';

describe('fileManagerFilter', () => {
	it('scopes files to the folder and retains folder navigation under a type facet', () => {
		const ids = fileManagerFilter(FILE_MANAGER_SAMPLE, null, '', 'image').map((entry) => entry.id);
		expect(ids.sort()).toEqual(['docs', 'photos']);
		expect(fileManagerFilter(FILE_MANAGER_SAMPLE, 'photos', '', 'image')).toHaveLength(2);
	});

	it('searches without mutating source ordering', () => {
		const before = JSON.stringify(FILE_MANAGER_SAMPLE);
		const ids = fileManagerFilter(FILE_MANAGER_SAMPLE, 'photos', 'ОБЛОЖ').map((entry) => entry.id);
		expect(ids).toEqual(['cover']);
		expect(JSON.stringify(FILE_MANAGER_SAMPLE)).toBe(before);
	});
});
