import { IconType } from 'react-icons';

export interface ISidebarLink<T> {
	name: T;
	href: string;
	icon?: IconType;
}
