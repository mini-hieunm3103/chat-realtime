import GuestLayout from '@/Layouts/GuestLayout';
import Button from "@/Components/Button";
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
                <Button size="lg" className="btn-block" disabled={processing}>
                    {status ? "Re-send ": "Send "} Verification Email
                </Button>
                <div className="mt-6 flex items-center justify-between">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        style = {{"borderRadius":"0.375rem","fontSize":"0.875rem","lineHeight":"1.25rem","textDecoration":"underline",":hover":{"color":"#111827"}}}
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
