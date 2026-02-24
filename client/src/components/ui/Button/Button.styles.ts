import { cva } from 'class-variance-authority';

import baseStyles from './styles/baseStyles.module.scss';
import variantsStyles from './styles/buttonVariants.module.scss';
import sizeStyles from './styles/sizeStyles.module.scss';

export const buttonStyles = cva(baseStyles['button'], {
	variants: {
		variant: {
			primary: variantsStyles['variant--primary'],
			secondary: variantsStyles['variant--secondary'],
			outline: variantsStyles['variant--outline'],
			ghost: variantsStyles['variant--ghost'],
			link: variantsStyles['variant--link'],
		},
		size: {
			sm: sizeStyles['size--sm'],
			md: sizeStyles['size--md'],
			lg: sizeStyles['size--lg'],
		},
		isIcon: {
			true: baseStyles['button--icon'],
			false: '',
		},
		isRounded: {
			true: baseStyles['button--rounded'],
			false: '',
		},
		isDisabled: {
			true: baseStyles['button--disabled'],
			false: '',
		},
		fullWidth: {
			true: baseStyles['button--full-width'],
			false: '',
		},
	},
	compoundVariants: [
		{ isIcon: false, size: 'sm', className: sizeStyles['padding--sm'] },
		{ isIcon: false, size: 'md', className: sizeStyles['padding--md'] },
		{ isIcon: false, size: 'lg', className: sizeStyles['padding--lg'] },
		{ isIcon: true, size: 'sm', className: sizeStyles['padding--sm-icon'] },
		{ isIcon: true, size: 'md', className: sizeStyles['padding--md-icon'] },
		{ isIcon: true, size: 'lg', className: sizeStyles['padding--lg-icon'] },
	],
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
});
