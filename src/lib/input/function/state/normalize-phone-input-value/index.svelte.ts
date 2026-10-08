export const normalizePhoneInputValue = (raw: string): string => {
	let unformattedValue = raw.replace(/\D/g, '');
	if (unformattedValue.startsWith('8')) {
		unformattedValue = '7' + unformattedValue.substring(1);
	}
	if (unformattedValue.startsWith('+7')) {
		unformattedValue = unformattedValue.substring(2);
	}
	return unformattedValue.substring(0, 11);
};

export default normalizePhoneInputValue;
