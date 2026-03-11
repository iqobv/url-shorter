import SkeletonLoader, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Skeleton = (props: SkeletonProps) => {
	return (
		<SkeletonLoader
			baseColor={props.baseColor || 'var(--skeleton-color)'}
			highlightColor={props.highlightColor || 'var(--skeleton-highlight-color)'}
			{...props}
		/>
	);
};

export default Skeleton;
