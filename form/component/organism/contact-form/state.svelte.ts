import { CONTACT_FORM_MESSAGES } from '$stylist/form/const/object/contact-form-messages';
import type { RecipeContactForm } from '$stylist/form/interface/recipe/contact-form';

export function createContactFormState(getProps: () => RecipeContactForm) {
	const props = $derived(getProps());
	const messages = $derived({ ...CONTACT_FORM_MESSAGES, ...props.messages });
	let message = $derived(props.initialMessage ?? '');
	let consent = $state(false);
	return {
		get messages() {
			return messages;
		},
		get message() {
			return message;
		},
		set message(value: string) {
			message = value;
		},
		get consent() {
			return consent;
		},
		set consent(value: boolean) {
			consent = value;
		},
		get rest() {
			const {
				messages: _messages,
				feedback,
				topicLabel,
				topicValue,
				onClearTopic,
				submitting,
				initialMessage,
				formAttachment,
				consentContent,
				errorDetails,
				footer,
				class: _class,
				...rest
			} = props;
			return rest;
		}
	};
}
export default createContactFormState;
