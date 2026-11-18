import type { ContactFormMessages } from '$stylist/form/type/object/contact-form-messages';
export const CONTACT_FORM_MESSAGES = {
	name: 'Your name',
	contact: 'Contact for a reply',
	contactPlaceholder: 'Email, phone or messenger',
	message: 'Your message',
	submit: 'Send message',
	submitting: 'Sending…',
	topic: 'Topic',
	clearTopic: 'Clear topic',
	honeypot: 'Leave this field empty',
	consent: 'I agree to the processing of my personal data.',
	note: 'Only include information needed for your request.',
	success: 'Thank you. Your message has been sent.'
} satisfies ContactFormMessages;
