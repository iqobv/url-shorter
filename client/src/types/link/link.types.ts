export interface ILink {
	id: string;
	userId: string | null;
	workspaceId: string | null;
	originalUrl: string;
	domain: string;
	slug: string;
	isCustom: false;
	totalClicks: number;
	uniqueClicks: number;
	claimToken: string | null;
	title: string | null;
	siteName: string | null;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
