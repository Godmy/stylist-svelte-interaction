import { UploadProgressManager } from '$stylist/file/class/manager/upload-progress';
import type { SlotUploadFile as IUploadFile } from '$stylist/file/interface/slot/upload-file';
import type { RecipeUploadProgress } from '$stylist/file/interface/recipe/upload-progress';

export function createUploadProgressState(getProps: () => RecipeUploadProgress) {
	const props = $derived(getProps());
	const files = $derived(props.files ?? []);
	const hostClass = $derived(props.hostClass ?? '');
	const itemClass = $derived(props.itemClass ?? '');
	const progressClass = $derived(props.progressClass ?? '');
	const showFileName = $derived(props.showFileName ?? true);
	const showFileSize = $derived(props.showFileSize ?? true);
	const showProgress = $derived(props.showProgress ?? true);
	const showActions = $derived(props.showActions ?? true);
	const onRetry = $derived(props.onRetry);
	const onCancel = $derived(props.onCancel);
	const onRemove = $derived(props.onRemove);
	const autoHideCompleted = $derived(props.autoHideCompleted ?? false);
	const maxVisible = $derived(props.maxVisible ?? 5);
	const variant = $derived(props.variant ?? 'default');

	const restProps = $derived.by(() => {
		const {
			files: _files,
			hostClass: _hostClass,
			itemClass: _itemClass,
			progressClass: _progressClass,
			showFileName: _showFileName,
			showFileSize: _showFileSize,
			showProgress: _showProgress,
			showActions: _showActions,
			onRetry,
			onCancel,
			onRemove,
			autoHideCompleted: _autoHideCompleted,
			maxVisible: _maxVisible,
			variant: _variant,
			...rest
		} = props;

		return rest;
	});

	const visibleFiles = $derived.by(() => {
		let visible = files;

		if (autoHideCompleted) {
			visible = visible.filter((file) => file.status !== 'success');
		}

		if (maxVisible > 0) {
			visible = visible.slice(0, maxVisible);
		}

		return visible;
	});

	function handleRetry(file: IUploadFile): void {
		UploadProgressManager.handleRetry(file, onRetry);
	}

	function handleCancel(file: IUploadFile): void {
		UploadProgressManager.handleCancel(file, onCancel);
	}

	function handleRemove(file: IUploadFile): void {
		UploadProgressManager.handleRemove(file, onRemove);
	}

	return {
		get files() {
			return files;
		},
		get hostClass() {
			return hostClass;
		},
		get itemClass() {
			return itemClass;
		},
		get progressClass() {
			return progressClass;
		},
		get showFileName() {
			return showFileName;
		},
		get showFileSize() {
			return showFileSize;
		},
		get showProgress() {
			return showProgress;
		},
		get showActions() {
			return showActions;
		},
		get autoHideCompleted() {
			return autoHideCompleted;
		},
		get maxVisible() {
			return maxVisible;
		},
		get variant() {
			return variant;
		},
		get classes() {
			return ['c-upload-progress', typeof props.class === 'string' ? props.class : '']
				.filter(Boolean)
				.join(' ');
		},
		get restProps() {
			return restProps;
		},
		get visibleFiles() {
			return visibleFiles;
		},
		handleRetry,
		handleCancel,
		handleRemove
	};
}
