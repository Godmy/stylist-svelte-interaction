export class ObjectManagerSearchBar {
	/**
	 * Нормализует поисковый запрос
	 */
	static normalizeQuery(query: string): string {
		return query.trim().toLowerCase();
	}

	/**
	 * Проверяет, является ли запрос пустым
	 */
	static isEmptyQuery(query: string): boolean {
		return !query || query.trim().length === 0;
	}

	/**
	 * Определяет, нужно ли показывать кнопку очистки
	 */
	static shouldShowClearButton(value: string, disabled: boolean): boolean {
		return !!(value && value.trim().length > 0 && !disabled);
	}

	/**
	 * Фильтрует подсказки по поисковому запросу
	 */
	static filterSuggestions(
		suggestions: {
			text: string;
			icon?: string;
			count?: number;
			category?: string;
		}[],
		query: string,
		maxResults?: number
	): {
		text: string;
		icon?: string;
		count?: number;
		category?: string;
	}[] {
		const normalizedQuery = this.normalizeQuery(query);
		if (!normalizedQuery) return suggestions.slice(0, maxResults);

		const filtered = suggestions.filter((suggestion) =>
			suggestion.text.toLowerCase().includes(normalizedQuery)
		);

		return maxResults ? filtered.slice(0, maxResults) : filtered;
	}

	/**
	 * Сортирует подсказки по релевантности
	 */
	static sortSuggestions(
		suggestions: {
			text: string;
			icon?: string;
			count?: number;
			category?: string;
		}[],
		query: string
	): {
		text: string;
		icon?: string;
		count?: number;
		category?: string;
	}[] {
		const normalizedQuery = this.normalizeQuery(query);
		if (!normalizedQuery) return suggestions;

		return [...suggestions].sort((a, b) => {
			const aStartsWith = a.text.toLowerCase().startsWith(normalizedQuery);
			const bStartsWith = b.text.toLowerCase().startsWith(normalizedQuery);

			if (aStartsWith && !bStartsWith) return -1;
			if (!aStartsWith && bStartsWith) return 1;

			// Sort by count if available
			if (b.count !== undefined && a.count !== undefined) {
				return b.count - a.count;
			}

			return a.text.localeCompare(b.text);
		});
	}

	/**
	 * Группирует подсказки по категории
	 */
	static groupSuggestionsByCategory(
		suggestions: {
			text: string;
			icon?: string;
			count?: number;
			category?: string;
		}[]
	): Record<
		string,
		{
			text: string;
			icon?: string;
			count?: number;
			category?: string;
		}[]
	> {
		return suggestions.reduce<
			Record<
				string,
				{
					text: string;
					icon?: string;
					count?: number;
					category?: string;
				}[]
			>
		>((groups, suggestion) => {
			const category = suggestion.category ?? 'default';
			if (!groups[category]) {
				groups[category] = [];
			}
			groups[category].push(suggestion);
			return groups;
		}, {});
	}

	/**
	 * Создаёт поисковый запрос из объекта
	 */
	static createQuery(options: { query?: string; filters?: Record<string, string> }): string {
		const { query = '', filters = {} } = options;
		const filterParts = Object.entries(filters)
			.map(([key, value]) => `${key}:${value}`)
			.join(' ');

		return filterParts ? `${query} ${filterParts}`.trim() : query;
	}

	/**
	 * Парсит поисковый запрос на компоненты
	 */
	static parseQuery(query: string): {
		baseQuery: string;
		filters: Record<string, string>;
	} {
		const parts = query.split(' ').filter(Boolean);
		const filters: Record<string, string> = {};
		const baseParts: string[] = [];

		for (const part of parts) {
			const colonIndex = part.indexOf(':');
			if (colonIndex > 0) {
				const key = part.substring(0, colonIndex);
				const value = part.substring(colonIndex + 1);
				filters[key] = value;
			} else {
				baseParts.push(part);
			}
		}

		return {
			baseQuery: baseParts.join(' '),
			filters
		};
	}

	/**
	 * Определяет оптимальное значение debounce на основе контекста
	 */
	static getDebounceMs(context: 'instant' | 'normal' | 'slow', customMs?: number): number {
		if (customMs !== undefined) return customMs;

		switch (context) {
			case 'instant':
				return 150;
			case 'slow':
				return 500;
			default:
				return 300;
		}
	}
}
