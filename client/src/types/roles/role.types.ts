import { Permissions } from '../permissions.types';

export interface IRole {
	id: string;
	workspaceId: string;
	name: string;
	description: string | null;
	permissions: Permissions[];
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
