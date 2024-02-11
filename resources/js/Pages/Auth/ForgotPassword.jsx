import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password"/>
            <p className="font-bold text-center h1">Password Reset</p>

            {status
                ?
                <div className="alert alert-success text-center">{status}</div>
                :
                <p className="text-center mb-6">
                    Forgot your password? No problem. Just let us know your email address and we will email you a
                    password
                    reset link that will allow you to choose a new one.
                </p>
            }

            <form onSubmit={submit} className="mb-6">
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

                <PrimaryButton className="btn btn-lg btn-block btn-primary" disabled={processing}>
                    Send Reset Link {status && "Again"}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
