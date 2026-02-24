import Link from 'next/link';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';
import ButtonContent from './ButtonContent/ButtonContent';

const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	isIcon = false,
	isRounded = false,
	fullWidth = false,
	isLoading = false,
	href,
	disabled = false,
	className = '',
	contentClassName = '',
	...rest
}: ButtonProps) => {
	const isLink = !!href && !disabled && !isLoading;

	const styles = buttonStyles({
		variant,
		size,
		isIcon,
		isRounded,
		fullWidth,
		isDisabled: isLoading,
	});

	const isInverse = variant === 'primary';

	return (
		<>
			{isLink ? (
				<Link
					href={href}
					className={`${styles} ${className}`}
					{...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					<ButtonContent
						loading={isLoading}
						className={contentClassName}
						isInverse={isInverse}
					>
						{children}
					</ButtonContent>
				</Link>
			) : (
				<button
					className={`${styles} ${className}`}
					disabled={disabled || isLoading}
					{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
				>
					<ButtonContent
						loading={isLoading}
						className={contentClassName}
						isInverse={isInverse}
					>
						{children}
					</ButtonContent>
				</button>
			)}
		</>
	);
};

export default Button;
