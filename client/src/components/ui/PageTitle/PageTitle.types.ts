export interface PageTitleProps {
	title: React.ReactNode;
	description?: React.ReactNode;
	titleComponent?: React.ElementType;
	descriptionComponent?: React.ElementType;
	disablePadding?: boolean;
	centered?: boolean;
	className?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	extraClassName?: string;
	style?: React.CSSProperties;
	extra?: React.ReactNode;
}
