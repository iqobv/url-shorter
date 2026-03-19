import { Permissions } from '../permissions.types';

export interface IWorkspaceMember {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	workspaceId: string;
	invitedByUserId: string | null;
	invitedByInviteLinkId: string | null;
	displayName: string;
	permissions: Permissions[];
	deletedAt: Date | null;
	roles: [
		{
			id: string;
			workspaceId: string;
			name: string;
			description: null;
			permissions: Permissions[];
			createdAt: Date;
			updatedAt: Date;
			deletedAt: Date | null;
		},
	];
}

