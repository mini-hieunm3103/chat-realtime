import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.data;
    console.log(user)
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        bio: user.bio,
        twitter: user.twitter,
        github: user.github,
        facebook: user.facebook,
    });
    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit}>
                <div className="form-group">
                    <InputLabel htmlFor="name" value="Name" className="small"/>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={errors.name ? "is-invalid" : null}
                        autoComplete="username"
                        placeholder="Enter your name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
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
                        placeholder="Enter your email"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="bio" value="Bio" className="small"/>

                    <TextInput
                        id="bio"
                        name="bio"
                        value={data.bio}
                        className={errors.bio ? "is-invalid" : null}
                        placeholder="Express yourself"
                        isFocused={true}
                        onChange={(e) => setData('bio', e.target.value)}
                    />

                    <InputError message={errors.bio} className="mt-2"/>
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="facebook" value="Facebook" className="small"/>

                    <TextInput
                        id="facebook"
                        name="facebook"
                        value={data.facebook}
                        className={errors.facebook ? "is-invalid" : null}
                        placeholder="Link to your facebook profile. Example: https://facebook.com/your_name"
                        isFocused={true}
                        onChange={(e) => setData('facebook', e.target.value)}
                    />

                    <InputError message={errors.facebook} className="mt-2"/>
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="github" value="Github" className="small"/>

                    <TextInput
                        id="github"
                        type="github"
                        name="github"
                        value={data.github}
                        className={errors.github ? "is-invalid" : null}
                        placeholder="Link to your github profile. Example: https://github.com/your_name"
                        isFocused={true}
                        onChange={(e) => setData('github', e.target.value)}
                    />

                    <InputError message={errors.github} className="mt-2"/>
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="twitter" value="Twitter" className="small"/>

                    <TextInput
                        id="twitter"
                        name="twitter"
                        value={data.twitter}
                        className={errors.twitter ? "is-invalid" : null}
                        placeholder="Link to your twitter profile. Example: https://twitter.com/your_name"
                        isFocused={true}
                        onChange={(e) => setData('twitter', e.target.value)}
                    />

                    <InputError message={errors.twitter} className="mt-2"/>
                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified{". "}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                // className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{
                                    "borderRadius": "0.375rem",
                                    "fontSize": "0.875rem",
                                    "lineHeight": "1.25rem",
                                    "color": "#4B5563",
                                    "textDecoration": "underline",
                                    ":hover": {"color": "#111827"}
                                }}
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2"
                                 style={{
                                     "fontSize": "0.875rem",
                                     "lineHeight": "1.25rem",
                                     "fontWeight": 500,
                                     "color": "#059669"
                                 }}
                            >
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
                <PrimaryButton className="btn btn-lg btn-block btn-primary mt-6" disabled={processing}>
                    Save Preferences
                </PrimaryButton>
                <div className="flex items-center gap-4">

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
