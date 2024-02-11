import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password"/>
            <p className="font-bold text-center h1 mb-6">Confirm Password</p>

            <div className="text-center mb-6">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="form-group">
                    <InputLabel htmlFor="password" value="Password" className="small"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={errors.password ? "is-invalid" : null}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <PrimaryButton className="btn btn-lg btn-block btn-primary" disabled={processing}>
                    Continue
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
