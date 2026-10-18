export interface RecipeDatePairPicker {
	/** Start date, ISO `yyyy-mm-dd`, or '' when not chosen. */
	value?: string;
	/** End date, ISO — computed by the host. */
	endValue?: string;
	startLabel?: string;
	endLabel?: string;
	/** Time shown after the date, e.g. «04:00». */
	startTime?: string | null;
	endTime?: string | null;
	/** What the end box says while there is no start date, e.g. «2-й день». */
	endPlaceholder?: string;
	/** Only these ISO dates can be picked; absent — any day from today. */
	availableDates?: string[];
	/** The end box is a picker too (off by default: the host computes the end). Its dates start at the start date. */
	endEditable?: boolean;
	onChange?: (value: string) => void;
	onEndChange?: (value: string) => void;
}
