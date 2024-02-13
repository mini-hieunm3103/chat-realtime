import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from "@/Components/Button.jsx";
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import {Transition} from "@headlessui/react";

export default function UpdatePasswordForm({ showStatus, className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="">
                <div className="form-group">
                    <InputLabel htmlFor="current_password" value="Current Password" className="small"/>

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        error ={errors.current_password}
                        autoComplete="current-password"
                        placeholder="Current password"
                    />

                    <InputError message={errors.current_password} className="mt-2"/>
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="password" value="New Password"  className="small"/>

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        placeholder="New password"
                        error ={errors.password}
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="small"/>

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        placeholder="Verify password"
                        error ={errors.password_confirmation}
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>
                <Button size="lg" className="btn-block mt-6" disabled={processing}>Change Password</Button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    {recentlySuccessful && showStatus("Your password has been saved")}
                </Transition>
            </form>
        </section>
    );
}
