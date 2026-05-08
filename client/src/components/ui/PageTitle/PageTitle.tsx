import styles from './PageTitle.module.scss';
import { PageTitleProps } from './PageTitle.types';

const PageTitle = ({
	title,
	description,
	titleComponent = 'h1',
	descriptionComponent = 'p',
	className,
	descriptionClassName,
	titleClassName,
	extraClassName,
	disablePadding = false,
	style,
	centered = false,
	extra,
}: PageTitleProps) => {
	const Title = titleComponent;
	const Description = descriptionComponent;

	const containerClassNames = [
		styles.container,
		disablePadding && styles.noPadding,
		centered && styles.centered,
		className,
	]
		.filter(Boolean)
		.join(' ')
		.trim();

	return (
		<div
			className={containerClassNames}
			style={style}
		>
			<Title className={`${styles.title} ${titleClassName}`}>{title}</Title>
			{description && (
				<Description
					className={`${styles.description} ${descriptionClassName}`}
				>
					{description}
				</Description>
			)}
			{extra && (
				<div className={`${styles.extra} ${extraClassName}`}>{extra}</div>
			)}
		</div>
	);
};

export default PageTitle;
