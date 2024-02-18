import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from "@/Components/Button.jsx";
import TextInput from '@/Components/TextInput';
import {Head, Link, router, useForm} from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <p className="font-bold text-center h1">Sign in</p>
            <p className="text-center mb-6">Welcome to the official Chat web-client.</p>

            <form onSubmit={submit} className="mb-6">
                <div className="form-group">
                    <InputLabel htmlFor="email" value="Email" className="small"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        error={errors.email}
                        autoComplete="username"
                        placeholder="Enter your email"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="password" value="Password" className="small"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        error={errors.password}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="form-group d-flex justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="custom-control-input"
                            id="checkbox-remember"
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="checkbox-remember">Remember me</label>
                    </div>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                        >
                            Reset Password
                        </Link>
                    )}
                </div>

                <Button size="lg" className="btn-block" disabled={processing}>
                    Log in
                </Button>
            </form>
            <p className="text-center">
                Don't have an account yet <Link href={route('register')}>Register</Link>.
            </p>
        </GuestLayout>
    );
}
