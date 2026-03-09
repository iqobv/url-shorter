import { Params } from 'next/dist/server/request/params';

export interface IWorkspaceParams extends Params {
	workspaceId: string;
}
