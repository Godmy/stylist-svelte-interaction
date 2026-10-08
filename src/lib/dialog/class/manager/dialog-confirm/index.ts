export class DialogConfirmManager {
	static handleConfirmCallback(onConfirm: () => void): void {
		onConfirm();
	}
}
