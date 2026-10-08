export const formatPhoneNumber = (value: string): string => {
	if (!value) return '';

	const cleaned = value.replace(/\D/g, '');
	let formatted = '+7 (';

	for (let i = 0; i < 11; i++) {
		if (i < cleaned.length) {
			if (i === 0) {
				formatted += cleaned[i];
			} else if (i === 3) {
				formatted += ') ' + cleaned[i];
			} else if (i === 6) {
				formatted += '-' + cleaned[i];
			} else if (i === 8) {
				formatted += '-' + cleaned[i];
			} else {
				formatted += cleaned[i];
			}
		} else if (i === 0) {
			formatted += '_';
		} else if (i === 3) {
			formatted += ') _';
		} else if (i === 6 || i === 8) {
			formatted += '-_';
		} else {
			formatted += '_';
		}
	}

	return formatted;
};

export default formatPhoneNumber;
