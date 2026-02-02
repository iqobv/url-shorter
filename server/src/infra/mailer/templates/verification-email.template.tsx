import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Tailwind,
	Text,
} from '@react-email/components';

import React from 'react';

interface VerificationEmailTemplateProps {
	url: string;
}

export default function VerificationEmailTemplate({
	url,
}: VerificationEmailTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>Verify your email address</Preview>
			<Tailwind>
				<Body>
					<Heading>Welcome To URL Shorter</Heading>
					<Text>
						Please verify your email address by clicking the link below:
					</Text>
					<Link
						target="_blank"
						href={url}
						className="bg-black text-white block p-3 rounded-lg select-none no-underline font-semibold text-md"
					>
						Confirm your email address
					</Link>
					<Container className="text-center text-sm">
						<Text>Link not working?</Text>
						<Text>Copy and paste the following URL into your browser:</Text>
						<Link href={url} className="mt-3 underline text-blue-500">
							{url}
						</Link>
					</Container>
					<Text>Thank you for using URL Shorter!</Text>
				</Body>
			</Tailwind>
		</Html>
	);
}
