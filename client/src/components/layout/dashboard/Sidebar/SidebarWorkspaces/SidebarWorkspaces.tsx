'use client';

import {
	getAllUserWorkspaces,
	getDefaultWorkspace,
	getWorkspaceById,
} from '@/api';
import { Button } from '@/components/ui';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useWorkspaceId } from '@/hooks';
import { useGetUser } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import styles from './SidebarWorkspaces.module.scss';
import SidebarWorkspacesGroup from './SidebarWorkspacesGroup/SidebarWorkspacesGroup';
import SidebarWorkspacesTrigger from './SidebarWorkspacesTrigger/SidebarWorkspacesTrigger';

const SidebarWorkspaces = () => {
	const selectedWorkspaceId = useWorkspaceId();

	const t = useTranslations('dashboard.sidebar.workspaces');

	const user = useGetUser();

	const { data: defaultWorkspace } = useQuery({
		queryFn: getDefaultWorkspace,
		queryKey: QUERY_KEYS.WORKSPACE.DEFAULT(user?.id || ''),
	});

	const { data: workspaces } = useQuery({
		queryFn: getAllUserWorkspaces,
		queryKey: QUERY_KEYS.WORKSPACE.ALL_WORKSPACES(user?.id || ''),
	});

	const { data: workspace } = useQuery({
		queryFn: () => getWorkspaceById(selectedWorkspaceId || ''),
		queryKey: QUERY_KEYS.WORKSPACE.GET_WORKSPACE(selectedWorkspaceId || ''),
		enabled: !!selectedWorkspaceId,
	});

	return (
		<div className={styles['sidebar-workspaces']}>
			<Dropdown<string> value={selectedWorkspaceId || defaultWorkspace?.id}>
				<SidebarWorkspacesTrigger
					name={workspace?.name || defaultWorkspace?.name || 'My Workspace'}
					type={
						workspace?.ownerId === user?.id && defaultWorkspace?.isPersonal
							? t('type.personal')
							: t('type.shared')
					}
				/>
				<Dropdown.Menu width="trigger">
					{workspaces && (
						<>
							<SidebarWorkspacesGroup
								label={t('dropdown.own')}
								workspaces={workspaces.own}
							/>
							<SidebarWorkspacesGroup
								label={t('dropdown.shared')}
								workspaces={workspaces.shared}
							/>
						</>
					)}
					<Dropdown.Divider />
					<Dropdown.Item asChild unstyled>
						<Button href={PRIVATE_PAGES.ONBOARDING} fullWidth variant="outline">
							{t('dropdown.create')}
						</Button>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default SidebarWorkspaces;
