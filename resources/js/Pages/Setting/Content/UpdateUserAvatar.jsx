import { createAvatar } from '@dicebear/core';
import
{
    adventurer,
    adventurerNeutral,
}
    from '@dicebear/collection';
import SettingCard from "@/Pages/Setting/Partials/SettingCard.jsx";
import {useForm, usePage} from "@inertiajs/react";
import {avatarOptions} from "@/Helper/config.js";
import {useEffect, useState, useMemo} from "react";
import Button from "@/Components/Button.jsx";
import Select from 'react-select';
import Swal from "sweetalert2";
import {ColorPicker} from "@/Components/Input/ColorPicker.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import {Transition} from "@headlessui/react";

function DicebearAvatar({data, isLinkOrNull, setUserAvatarOptions}){
    const avatarStyleArr = [
        adventurer,
        adventurerNeutral,
    ]
    const [avatarBackgroundColor, setAvatarBackgroundColor ] = useState((!isLinkOrNull) ? data.backgroundColor[0] : 'b6e3f4')
    const [avatarStylePosition, setAvatarStylePosition] = useState((!isLinkOrNull) ? data.style.position : avatarOptions.avatarStyle[0].value)
    const [avatarStyle, setAvatarStyle] = useState(avatarStyleArr[avatarStylePosition])
    const [avatarEarrings, setAvatarEarrings] = useState((!isLinkOrNull) ? data.earrings[0] : avatarOptions.earringsOptions[0].value)
    const [avatarGlasses, setAvatarGlasses] = useState((!isLinkOrNull) ? data.glasses[0]: avatarOptions.glassesOptions[0].value)
    const [avatarFeatures, setAvatarFeatures] = useState((!isLinkOrNull) ? data.features[0]: avatarOptions.featuresOptions[0].value)
    const [avatarEyebrows, setAvatarEyebrows] = useState((!isLinkOrNull) ? data.eyebrows[0]: avatarOptions.eyebrowsOptions[0].value)
    const [avatarEyes, setAvatarEyes] = useState((!isLinkOrNull) ? data.eyes[0]: avatarOptions.eyesOptions[0].value)
    const [avatarMouth, setAvatarMouth] = useState((!isLinkOrNull) ? data.mouth[0]: avatarOptions.mouthOptions[0].value)
    const [avatarHair, setAvatarHair] = useState((!isLinkOrNull) ? data.hair[0]: avatarOptions.hairOptions[0].value)
    const [avatarSkinColor, setAvatarSkinColor] = useState((!isLinkOrNull) ? data.skinColor[0]: avatarOptions.skinColorOptions[0].value)
    const [avatarHairColor, setAvatarHairColor ] = useState((!isLinkOrNull) ? data.hairColor[0]: "000000")
    const [avatarFlip, setAvatarFlip] = useState((!isLinkOrNull) ? data.flip : avatarOptions.flipOptions[0].value)


    const userAvatarOptions = useMemo(() => ({
            style: {
                name: avatarStyle.meta.title,
                position: avatarStylePosition
            },
            radius: 50,
            translateY: 5,
            scale: 100,
            flip: avatarFlip,
            backgroundType: ["solid"],
            earringsProbability: (avatarEarrings) ? 100 : 0,
            glassesProbability:  (avatarGlasses) ? 100 : 0,
            featuresProbability: (avatarFeatures) ? 100 :0,
            earrings: [avatarEarrings],
            eyes: [avatarEyes],
            glasses: [avatarGlasses],
            mouth: [avatarMouth],
            hair: [avatarHair],
            eyebrows: [avatarEyebrows],
            skinColor: [avatarSkinColor],
            features: [avatarFeatures],
            backgroundColor: [avatarBackgroundColor],
            hairColor: [avatarHairColor]
        }),
        [
            avatarBackgroundColor,
            avatarHairColor,
            avatarEarrings,
            avatarEyebrows,
            avatarEyes,
            avatarMouth,
            avatarHair,
            avatarSkinColor,
            avatarGlasses,
            avatarFeatures,
            avatarFlip,
            avatarStyle
        ]
    );
    useEffect(()=> {
        setAvatarStyle(avatarStyleArr[avatarStylePosition])
    }, [avatarStylePosition])
    useEffect(() => {
        setUserAvatarOptions(userAvatarOptions)
    }, [userAvatarOptions])
    const avatarDiceBear = createAvatar(avatarStyle, userAvatarOptions);
    const svg = avatarDiceBear.toString();

    return (
        <>
            <a target="_blank" className="ml-5" href="https://www.dicebear.com/playground">Document</a>
            <div className="row mt-5">
                <div className="col-4 mt-3">
                    <div className="row form-group">
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Avatar Style</div>
                            <Select
                                defaultValue={{label: avatarStyle.meta.title, value: avatarStylePosition}}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Select your character"
                                options={avatarOptions.avatarStyle}
                                onChange={(option) => setAvatarStylePosition(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Eyes
                            </div>
                            <Select
                                defaultValue={{label: avatarEyes, value: avatarEyes}}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                placeholder="Select your character"
                                options={avatarOptions.eyesOptions}
                                onChange={(option) => setAvatarEyes(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Background color:</div>
                            <ColorPicker
                                color={avatarBackgroundColor}
                                onChange={(e) => setAvatarBackgroundColor(e.match(/#(\w+)/)[1])}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Mouth
                            </div>
                            <Select
                                defaultValue={{label: avatarMouth, value: avatarMouth}}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                placeholder="Select your character"
                                options={avatarOptions.mouthOptions}
                                onChange={(option) => setAvatarMouth(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Eyebrows
                            </div>
                            <Select
                                defaultValue={{label: avatarEyebrows, value: avatarEyebrows}}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Select your character"
                                options={avatarOptions.eyebrowsOptions}
                                onChange={(option) => setAvatarEyebrows(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Features
                            </div>
                            <Select
                                isDisabled={(avatarStylePosition !== 0)}
                                defaultValue={{label: avatarFeatures, value: avatarFeatures}}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                placeholder="Select your character"
                                options={avatarOptions.featuresOptions}
                                onChange={(option) => setAvatarFeatures(option.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4 mt-3">
                    <div className="row flex-wrap">
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Flip</div>
                            <Select
                                defaultValue={{
                                    label: (avatarFlip) ? "true" : "false",
                                    value: avatarFlip
                                }}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Select your character"
                                options={avatarOptions.flipOptions}
                                onChange={(option) => setAvatarFlip(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Hair
                            </div>
                            <Select
                                isDisabled={(avatarStylePosition !== 0)}
                                defaultValue={{label: avatarHair, value: avatarHair}}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                placeholder="Select your character"
                                options={avatarOptions.hairOptions}
                                onChange={(option) => setAvatarHair(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Hair color:</div>
                            <ColorPicker
                                color={avatarHairColor}
                                onChange={(e) => setAvatarHairColor(e.match(/#(\w+)/)[1])}
                            />
                        </div>

                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Earrings</div>
                            <Select
                                isDisabled={(avatarStylePosition !== 0)}
                                defaultValue={{label: avatarEarrings, value: avatarEarrings}}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Select your character"
                                options={avatarOptions.earringsOptions}
                                onChange={(option) => setAvatarEarrings(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Glasses
                            </div>
                            <Select
                                defaultValue={{label: avatarGlasses, value: avatarGlasses}}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                placeholder="Select your character"
                                options={avatarOptions.glassesOptions}
                                onChange={(option) => setAvatarGlasses(option.value)}
                            />
                        </div>
                        <div className="col-12 mb-5">
                            <div className="mb-3 font-bold">Skin Color
                            </div>
                            <Select
                                isDisabled={(avatarStylePosition !== 0)}
                                defaultValue={{label: avatarSkinColor, value: avatarSkinColor}}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                placeholder="Select your character"
                                options={avatarOptions.skinColorOptions}
                                onChange={(option) => setAvatarSkinColor(option.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div dangerouslySetInnerHTML={{__html: svg}}/>
                </div>
            </div>
        </>

    )
}

export default function UpdateUserAvatar({status, showStatus, className = ''}) {
    const user = usePage().props.auth.data;
    const [userAvatarOptions, setUserAvatarOptions] = useState();
    const {data, setData, patch, errors, processing, recentlySuccessful, transform} = useForm({
        updateAvatar: true,
        avatar: JSON.parse(user.avatar)
    });

    const patternLink =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    const isLink = patternLink.test(user.avatar)
    // nếu isLink: true -> render input || ->render DicebearAvatar
    const [isCustom, toggle] = useState((!isLink && !Object.is(user.avatar, null)))
    const [imgSrc, setImgSrc] = useState((isLink) ? data.avatar : null);

    useEffect(() => {
        if (isCustom) {
            setData('avatar', userAvatarOptions)
        }
    }, [userAvatarOptions, isCustom])
    useEffect(()=> {
        if(!isCustom) {
            setData('avatar', imgSrc)
        }
    }, [imgSrc, isCustom])
    const submit = (e) => {
        e.preventDefault();
        patch(route('user.updateDetails'));
    };
    return (
        <SettingCard
            title="Avatar"
            dataTarget="profile-settings-social"
            icon="image"
        >
            <div className="d-flex justify-content-center mb-2 align-content-center">
                <h6 className="mb-0 mr-5">Custom your avatar: </h6>

                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" />
                    <CheckboxInput
                        id="switch-custom"
                        checked={isCustom}
                        onChange={(e) => toggle(e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="switch-custom"></label>
                </div>
            </div>
            <section className={className}>
                <form onSubmit={submit}>
                    {(isCustom)
                        ?
                        <DicebearAvatar
                            data={JSON.parse(user.avatar)}
                            isLinkOrNull={(isLink|| Object.is(user.avatar, null))}
                            setUserAvatarOptions={setUserAvatarOptions}
                        />
                        :
                        <div className="row">
                            <div className="form-group col-8">
                                <InputLabel htmlFor="src-avatar" value="Link to your avatar" className="small"/>

                                <TextInput
                                    id="src-avatar"
                                    name="name"
                                    value={(imgSrc ?? ((isLink) ? data.avatar : null))}
                                    error={errors.avatar}
                                    placeholder="Enter link to your avatar!"
                                    isFocused={true}
                                    onChange={(e) => setImgSrc(e.target.value)}
                                />

                                <InputError message={errors.avatar} className="mt-2"/>
                            </div>
                            <div className="col-4">
                                <img src={imgSrc ?? data.avatar} alt="avatar"/>
                            </div>
                        </div>

                    }


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
