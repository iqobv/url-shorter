'use client';

import { useGetLinks } from '@/stores';
import Link from 'next/link';

const LinksList = () => {
	const links = useGetLinks();

	return (
		<div>
			{links.map((link) => (
				<div key={link.id}>
					<Link
						href={`${process.env.NEXT_PUBLIC_SHORT_URL}/${link.slug}`}
						target="_blank"
					>
						{link.slug}
					</Link>
				</div>
			))}
		</div>
	);
};

export default LinksList;
