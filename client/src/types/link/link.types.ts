export interface ILink {
	id: string;
	userId: string | null;
	originalUrl: string;
	slug: string;
	isCustom: false;
	totalClicks: number;
	uniqueClicks: number;
	claimToken: string | null;
	createdAt: Date;
	updatedAt: Date;
}
