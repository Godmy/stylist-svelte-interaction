import type { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';
import type { RecipeDrawer } from '$stylist/menu/interface/recipe/drawer';

export class DrawerManager {
	drawerEl = $state<HTMLElement | null>(null);
	backdropEl = $state<HTMLElement | null>(null);

	constructor(private readonly props: RecipeDrawer) {}

	static close(props: { open?: boolean }, closable: boolean): void {
		if (closable) {
			props.open = false;
		}
	}

	static createCloseHandler(closable: boolean, closeFn: () => void): () => void {
		return () => {
			if (closable) {
				closeFn();
			}
		};
	}

	static createBackdropHandler(closable: boolean, closeFn: () => void): (e: MouseEvent) => void {
		return (e: MouseEvent) => {
			if (e.target === e.currentTarget && closable) {
				closeFn();
			}
		};
	}

	static createEscapeHandler(closable: boolean, closeFn: () => void): (e: KeyboardEvent) => void {
		return (e: KeyboardEvent) => {
			if (e.key === 'Escape' && closable) {
				closeFn();
			}
		};
	}

	static handleBackdropClick(
		e: MouseEvent,
		backdropEl: HTMLElement | null,
		closable: boolean,
		closeFn: () => void
	): void {
		if (e.target === backdropEl && closable) {
			closeFn();
		}
	}

	static handleBackdropKeyDown(
		e: KeyboardEvent,
		backdropEl: HTMLElement | null,
		closable: boolean,
		closeFn: () => void
	): void {
		if ((e.key === 'Enter' || e.key === ' ') && e.target === backdropEl && closable) {
			e.preventDefault();
			closeFn();
		}
	}

	static handleEscape(e: KeyboardEvent, closable: boolean, closeFn: () => void): void {
		if (e.key === 'Escape' && closable) {
			closeFn();
		}
	}

	get isOpen(): boolean {
		return this.props.open ?? false;
	}

	get position(): (typeof TOKEN_ALIGNMENT)[number] {
		return (this.props.position ?? 'right') as (typeof TOKEN_ALIGNMENT)[number];
	}

	get size(): string {
		return this.props.size ?? '300px';
	}

	get closable(): boolean {
		return this.props.closable ?? true;
	}

	get showBackdrop(): boolean {
		return this.props.showBackdrop ?? true;
	}

	get backdropClasses(): string {
		return ['drawer__backdrop', this.showBackdrop ? `drawer__backdrop--selected` : '']
			.filter(Boolean)
			.join(' ');
	}

	get drawerClasses(): string {
		return 'drawer__drawer';
	}

	get drawerOpenClasses(): string {
		return ['drawer__drawer-open', this.isOpen ? `drawer__drawer-open--selected` : '']
			.filter(Boolean)
			.join(' ');
	}

	close(): void {
		DrawerManager.close(this.props, this.closable);
	}

	handleBackdropClick(e: MouseEvent): void {
		DrawerManager.handleBackdropClick(e, this.backdropEl, this.closable, () => this.close());
	}

	handleBackdropKeyDown(e: KeyboardEvent): void {
		DrawerManager.handleBackdropKeyDown(e, this.backdropEl, this.closable, () => this.close());
	}

	handleEscape(e: KeyboardEvent): void {
		DrawerManager.handleEscape(e, this.closable, () => this.close());
	}
}
