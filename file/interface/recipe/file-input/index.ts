import type { HTMLInputAttributes } from 'svelte/elements';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TOKEN_SIZE } from '$stylist/theme/const/array/size';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeFileInput
	extends ComputeIntersectAll<
		[
			Omit<HTMLInputAttributes, 'size'> & {
				value?: File | File[];
				multiple?: boolean;
				accept?: string;
				disabled?: boolean;
				variant?: TokenColorTone;
				size?: (typeof TOKEN_SIZE)[number];
				placeholder?: string;
				onFileChange?: (files: File | File[] | null) => void;
				class?: string;
			}
		]
	> {}
