'use client';

import { Dropdown } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { IWorkspace } from '@/types';
import Link from 'next/link';

interface SidebarWorkspacesGroupProps {
	workspaces: IWorkspace[];
	label: string;
}

const SidebarWorkspacesGroup = ({
	workspaces,
	label,
}: SidebarWorkspacesGroupProps) => {
	return (
		<>
			{workspaces.length > 0 && (
				<Dropdown.Group>
					<Dropdown.Label>{label}</Dropdown.Label>
					{workspaces.map((w) => (
						<Dropdown.Item key={w.id} value={w.id} asChild>
							<Link href={PRIVATE_PAGES.DASHBOARD_WORKSPACE(w.id)}>
								{w.name}
							</Link>
						</Dropdown.Item>
					))}
				</Dropdown.Group>
			)}
		</>
	);
};

export default SidebarWorkspacesGroup;
