import { Skeleton } from '@/components/ui';
import styles from './LinkAnalyticsMetrics.module.scss';

const LOADERS = Array.from({ length: 4 }, (_, i) => (
	<Skeleton
		key={i}
		height={280}
	/>
));

const LinkAnalyticsMetricsLoader = () => {
	return <div className={styles.metrics}>{LOADERS}</div>;
};

export default LinkAnalyticsMetricsLoader;
