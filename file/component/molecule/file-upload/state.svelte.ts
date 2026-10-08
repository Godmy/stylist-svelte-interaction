import type { RecipeFileUpload } from '$stylist/file/interface/recipe/file-upload';

export function createFileUploadState(getProps: () => RecipeFileUpload) {
	const props = $derived(getProps());
	const accept = $derived(props.accept ?? '.pdf,.doc,.docx,.xls,.xlsx,.txt');
	const maxSize = $derived(props.maxSize ?? 10 * 1024 * 1024);
	const multiple = $derived(props.multiple ?? false);
	const status = $derived(props.status ?? 'idle');
	const file = $derived(props.file ?? null);
	const children = $derived(props.children);
	const disabled = $derived(props.disabled ?? false);
	const uploadText = $derived(props.uploadText ?? 'РёР»Рё РїРµСЂРµС‚Р°С‰РёС‚СЊ СЃСЋРґР°');
	const className = $derived(props.class ?? '');

	const restProps = $derived.by(() => {
		const {
			accept: _accept,
			maxSize: _maxSize,
			multiple: _multiple,
			status: _status,
			file: _file,
			onFileSelect,
			onUpload,
			children: _children,
			disabled: _disabled,
			uploadText: _uploadText,
			class: _class,
			...rest
		} = props;

		return rest;
	});

	function handleFileSelect(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files) {
			return;
		}

		if (multiple) {
			props.onFileSelect?.(files);
			return;
		}

		props.onFileSelect?.(files[0] ?? null);
	}

	async function handleUpload(): Promise<void> {
		if (!file || !props.onUpload) {
			return;
		}

		try {
			await props.onUpload(file);
		} catch (error) {
			console.error('Upload error:', error);
		}
	}

	function clearFile(): void {
		props.onFileSelect?.(null);
	}

	return {
		get accept() {
			return accept;
		},
		get maxSize() {
			return maxSize;
		},
		get multiple() {
			return multiple;
		},
		get status() {
			return status;
		},
		get file() {
			return file;
		},
		get children() {
			return children;
		},
		get disabled() {
			return disabled;
		},
		get uploadText() {
			return uploadText;
		},
		get className() {
			return className;
		},
		get restProps() {
			return restProps;
		},
		handleFileSelect,
		handleUpload,
		clearFile
	};
}
