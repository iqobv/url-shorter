import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing.i18n';

export const {
	Link,
	usePathname,
	getPathname,
	permanentRedirect,
	redirect,
	useRouter,
} = createNavigation(routing);
