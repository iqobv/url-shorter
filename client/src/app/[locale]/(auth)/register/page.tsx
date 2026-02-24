import { RegisterForm } from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Register',
};

export default function RegisterPage() {
	return <RegisterForm />;
}
