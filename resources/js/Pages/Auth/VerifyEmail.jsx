import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification"/>
            <p className="font-bold text-center h1 mb-6">Email Verification</p>

            {status !== 'verification-link-sent'
                ? (<div className="text-center mb-6">Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just emailed to you? If you didn't receive the
                    email, we will gladly send you another.</div>)
                : (<div className="alert alert-success text-center">A new verification link has been sent to the
                email address you provided during registration.</div>)
            }

            <form onSubmit={submit}>
                <PrimaryButton className="btn btn-lg btn-block btn-primary" disabled={processing}>
                    {status ? "Resend ": "Send "} Verification Email
                </PrimaryButton>
                <div className="mt-6 flex items-center justify-between">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
