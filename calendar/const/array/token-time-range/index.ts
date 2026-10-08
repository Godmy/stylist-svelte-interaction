import type { TokenTimeRange } from '$stylist/calendar/type/alias/token-time-range';

export const TOKEN_TIME_RANGE = [
	'1d',
	'7d',
	'30d',
	'90d',
	'1y'
] as const satisfies readonly TokenTimeRange[];
