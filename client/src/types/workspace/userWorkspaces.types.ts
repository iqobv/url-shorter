import { IWorkspace } from './workpsace.types';

export interface IUserWorkspaces {
	own: IWorkspace[];
	shared: IWorkspace[];
}
