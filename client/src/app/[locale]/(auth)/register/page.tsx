import { RegisterForm } from '@/components/auth';
import { TPageParams } from '@/types';
import { generateTitle } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.public.auth.register');
}

export default function RegisterPage() {
	return <RegisterForm />;
}
