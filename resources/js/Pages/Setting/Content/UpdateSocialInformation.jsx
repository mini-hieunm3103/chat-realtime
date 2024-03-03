import SettingCard from "@/Pages/Setting/Partials/SettingCard.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm, usePage} from "@inertiajs/react";
import TextareaInput from "@/Components/TextareaInput.jsx";
import Button from "@/Components/Button.jsx";
import {Transition} from "@headlessui/react";

export default function UpdateSocialInformation({status, showStatus,  className = '' }){
    const user = usePage().props.auth.data;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        bio: user.bio,
        twitter: user.twitter,
        github: user.github,
        facebook: user.facebook
    });
    const submit = (e) => {
        e.preventDefault();
        patch(route('user.updateDetails'));
    };
    return (
        <SettingCard
            title="Social"
            dataTarget="profile-settings-social"
            icon="share-2"
        >
            <section className={className}>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <InputLabel htmlFor="bio" value="Bio" className="small"/>

                        <TextareaInput
                            id="bio"
                            name="bio"
                            value={data.bio}
                            error={errors.bio}
                            placeholder="Express yourself"
                            data-autosize="true"
                            onChange={(e) => setData('bio', e.target.value)}
                        />

                        <InputError message={errors.bio} className="mt-2"/>
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="facebook" value="Facebook (optional)" className="small"/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="btn btn-ico btn-secondary btn-minimal">
                                    <i className="fe-facebook"></i>
                                </div>
                            </div>
                            <TextInput
                                id="facebook"
                                name="facebook"
                                value={data.facebook}
                                error={errors.facebook}
                                placeholder="Link to your facebook profile. Example: https://facebook.com/your_name"
                                isFocused={true}
                                onChange={(e) => setData('facebook', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.facebook} className="mt-2"/>
                    </div>

                    <div className="form-group">
                        <InputLabel htmlFor="github" value="Github (optional)" className="small"/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="btn btn-ico btn-secondary btn-minimal">
                                    <i className="fe-github"></i>
                                </div>
                            </div>
                            <TextInput
                                id="github"
                                type="github"
                                name="github"
                                value={data.github}
                                error={errors.github}
                                placeholder="Link to your github profile. Example: https://github.com/your_name"
                                isFocused={true}
                                onChange={(e) => setData('github', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.github} className="mt-2"/>
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="twitter" value="Twitter (optional)" className="small"/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="btn btn-ico btn-secondary btn-minimal">
                                    <i className="fe-twitter"></i>
                                </div>
                            </div>
                            <TextInput
                                id="twitter"
                                name="twitter"
                                value={data.twitter}
                                error={errors.twitter}
                                placeholder="Link to your twitter profile. Example: https://twitter.com/your_name"
                                isFocused={true}
                                onChange={(e) => setData('twitter', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.twitter} className="mt-2"/>
                    </div>
                    <Button size="lg" className="btn-block mt-6" disabled={processing}>
                        Save Preferences
                    </Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        {recentlySuccessful && showStatus("Your information has been saved")}
                    </Transition>
                </form>
            </section>


        </SettingCard>
    )
}
