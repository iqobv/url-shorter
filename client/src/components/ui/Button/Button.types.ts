export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'link';

export interface ButtonBaseProps {
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	isIcon?: boolean;
	isRounded?: boolean;
	fullWidth?: boolean;
	isLoading?: boolean;
	disabled?: boolean;
	className?: string;
	contentClassName?: string;
	tooltip?: React.ReactNode;
}

interface AnchorButtonProps
	extends
		Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>,
		ButtonBaseProps {
	href: string;
	type?: never;
}

interface NativeButtonProps
	extends
		Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>,
		ButtonBaseProps {
	href?: undefined;
}

export type ButtonProps = AnchorButtonProps | NativeButtonProps;
