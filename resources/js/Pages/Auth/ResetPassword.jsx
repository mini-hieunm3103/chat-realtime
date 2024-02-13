import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from "@/Components/Button.jsx";
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
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

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password"/>
            <p className="font-bold text-center h1 mb-6">Change Your Password</p>

            <form onSubmit={submit} className={"mb-6"}>
                <div className="form-group">
                    <InputLabel htmlFor="email" value="Email (You can not change email)" className="small"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={errors.email ? "is-invalid" : null}
                        autoComplete="username"
                        isFocused={true}
                        readOnly={true}
                        placeholder="Enter your email"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="password" value="New Password" className="small"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={errors.password ? "is-invalid" : null}
                        autoComplete="new-password"
                        placeholder="Enter Your New Password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="password_confirmation" value="Confirm New Password" className="small"/>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={errors.password ? "is-invalid" : null}
                        autoComplete="new-password"
                        placeholder="Enter Your New Password Again"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                <Button className="btn-block" size="lg" disabled={processing}>
                    Reset Password
                </Button>
            </form>
        </GuestLayout>
    );
}
