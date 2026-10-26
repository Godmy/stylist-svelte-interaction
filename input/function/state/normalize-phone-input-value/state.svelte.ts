export const normalizePhoneInputValue = (raw: string): string => {
	let unformattedValue = raw.replace(/\D/g, '');
	if (unformattedValue.startsWith('8')) {
		unformattedValue = '7' + unformattedValue.substring(1);
	}
	return unformattedValue.substring(0, 11);
};

export default normalizePhoneInputValue;
