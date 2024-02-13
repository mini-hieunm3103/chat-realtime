import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from "@/Components/Button";
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register"/>
            <p className="font-bold text-center h1">Sign up</p>
            <p className="text-center mb-6">Welcome to the official Chat web-client.</p>
            <form onSubmit={submit} className="mb-6">

                <div className="form-group" >
                    <InputLabel htmlFor="name" value="Name" className="small"/>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={errors.name ? "is-invalid" : null}
                        autoComplete="name"
                        isFocused={true}
                        placeholder="Enter your name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="email" value="Email" className="small"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={errors.email ? "is-invalid" : null}
                        autoComplete="username"
                        isFocused={true}
                        placeholder="Enter your email"
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
                        className={errors.password ? "is-invalid" : null}
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="small"/>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={errors.password ? "is-invalid" : null}
                        autoComplete="new-password"
                        placeholder="Enter your password again"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                <Button size="lg" className="btn-block" disabled={processing}>
                    Register
                </Button>
            </form>
            <p className="text-center">
                Already have an account? <Link href={route('login')}>Log In</Link>.
            </p>
        </GuestLayout>
    );
}
