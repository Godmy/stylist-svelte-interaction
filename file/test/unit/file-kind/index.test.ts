import { describe, expect, it } from 'vitest';
import { fileKind } from '$stylist/file/function/resolve/file-kind';

describe('fileKind', () => {
	it('classifies mixed-case extensions', () => {
		expect(fileKind('Cover.JPG')).toBe('image');
		expect(fileKind('guide.PDF')).toBe('document');
		expect(fileKind('data.tar.gz')).toBe('archive');
	});

	it('handles unknown and absent extensions', () => {
		expect(fileKind('README')).toBe('other');
		expect(fileKind('file.xyz')).toBe('other');
	});
});
