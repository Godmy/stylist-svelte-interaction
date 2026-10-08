import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
export interface RecipeDownloadCard {
	/** Метаданные файла */
	file: {
		/** Имя файла */
		name: string;

		/** Размер файла (в байтах или строковом формате) */
		size: string | number;

		/** Тип файла (MIME type или расширение) */
		type: string;

		/** Дата создания/обновления */
		date?: string;
	};
	/** Вариант оформления */
	variant?: TokenColorTone;
	/** URL для скачивания файла */
	downloadUrl: string;
	/** Альтернативный текст для иконки файла */
	iconAlt?: string;
	/** Показывать ли метаданные файла */
	showMetadata?: boolean;
	// default: true

	/** Пользовательская иконка для файла */
	icon?: string;
	/** Дополнительные CSS классы */
	class?: string;
}
