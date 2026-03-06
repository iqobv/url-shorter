export interface IWorkspace {
	id: string;
	ownerId: string;
	isPersonal: boolean;
	isDefault: boolean;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
