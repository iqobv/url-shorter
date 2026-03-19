import { ILink } from './link.types';

export interface IAllLinks {
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	items: ILink[];
}
