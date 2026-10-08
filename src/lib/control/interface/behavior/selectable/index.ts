/** Свойства выбора одного или нескольких значений */
export interface BehaviorSelectable<TValue = string> {
	/** Текущее выбранное значение */
	value?: TValue;
	/** Выбранные значения (режим множественного выбора) */
	values?: TValue[];
	/** Допускать множественный выбор */
	multiple?: boolean;
	/** Элемент выбран */
	selected?: boolean;
	/** Обработчик выбора */
	onSelect?: (value: TValue) => void;
	/** Обработчик изменения (единичного или множественного) */
	onChange?: (value: TValue | TValue[]) => void;
}
