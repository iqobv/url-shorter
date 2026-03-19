import { IWorkspaceMember } from './workspaceMember.types';

export interface IWorkspaceMemberWithUser extends IWorkspaceMember {
	user: {
		id: string;
		username: string;
		displayName: string;
	};
}
