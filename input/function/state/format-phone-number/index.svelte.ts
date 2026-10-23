export const formatPhoneNumber = (value: string): string => {
	if (!value) return '';

	const cleaned = value.replace(/\D/g, '').slice(0, 11);
	if (!cleaned) return '';
	const digits = (cleaned.startsWith('7') || cleaned.startsWith('8') ? cleaned.slice(1) : cleaned)
		.slice(0, 10)
		.padEnd(10, '_');
	return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
};

export default formatPhoneNumber;
