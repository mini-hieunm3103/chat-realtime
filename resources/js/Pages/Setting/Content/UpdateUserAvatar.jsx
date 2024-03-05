import { createAvatar } from '@dicebear/core';
import
{
    adventurer,
    adventurerNeutral,
}
    from '@dicebear/collection';
import SettingCard from "@/Pages/Setting/Partials/SettingCard.jsx";
import {useForm, usePage} from "@inertiajs/react";
import {avatarOptions} from "@/Helper/config.jsx";
import {useEffect, useState, useMemo} from "react";
import Button from "@/Components/Button.jsx";
import Select from 'react-select';
import Swal from "sweetalert2";
import {PopoverPicker} from "@/Components/Input/PopoverPicker.jsx";

export default function UpdateUserAvatar({status, showStatus,  className = '' }){
    const user = usePage().props.auth.data;

    const { data, setData, patch, errors, processing, recentlySuccessful , transform} = useForm({
        updateAvatar: true,
        avatar: user.avatar
    });
    const avatarDb = (typeof data.avatar === 'string' || data.avatar instanceof String) ? JSON.parse(data.avatar) : data.avatar
    console.log(avatarDb)
    // console.log(avatarDb)
    const avatarStyleArr = [
        adventurer,
        adventurerNeutral,
    ]
    const [avatarBackgroundColor, setAvatarBackgroundColor ] = useState(avatarDb.backgroundColor[0])
    const [avatarStylePosition, setAvatarStylePosition] = useState(avatarDb.style.position)
    const [avatarStyle, setAvatarStyle] = useState(avatarStyleArr[0])
    const [avatarEarrings, setAvatarEarrings] = useState(avatarDb.earrings[0])
    const [avatarGlasses, setAvatarGlasses] = useState(avatarDb.glasses[0])
    const [avatarFeatures, setAvatarFeatures] = useState(avatarDb.features[0])
    const [avatarEyebrows, setAvatarEyebrows] = useState(avatarDb.eyebrows[0])
    const [avatarEyes, setAvatarEyes] = useState(avatarDb.eyes[0])
    const [avatarMouth, setAvatarMouth] = useState(avatarDb.mouth[0])
    const [avatarHair, setAvatarHair] = useState(avatarDb.hair[0])
    const [avatarSkinColor, setAvatarSkinColor] = useState(avatarDb.skinColor[0])
    const [avatarHairColor, setAvatarHairColor ] = useState(avatarDb.hairColor[0])
    const [avatarFlip, setAvatarFlip] = useState(avatarDb.flip)

    const userAvatarOptions = useMemo(() => ({
        style: {
            name: avatarStyle.meta.title,
            position: avatarStylePosition
        },
        radius: 50,
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
    const avatarDiceBear = createAvatar(avatarStyle, userAvatarOptions);
    const svg = avatarDiceBear.toString();
    useEffect(() => {
        setData('avatar', userAvatarOptions)
    }, [userAvatarOptions])
    const submit = (e)  => {
        e.preventDefault();
        patch(route('user.updateDetails'), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success" ,
                    title: "Update Your Avatar Successfully!",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(()=> {
                    location.reload()
                }, 3000)
            }
        });
    };
    return (
        <SettingCard
            title="Avatar"
            dataTarget="profile-settings-social"
            icon="image"
        >
            <section className={className}>
                <form onSubmit={submit}>
                    <a target="_blank" className="ml-5" href="https://www.dicebear.com/playground">Document</a>
                    <div className="row mt-5">
                        <div className="col-4 mt-3">
                            <div className="row flex-wrap">
                                <div className="col-12 mb-5">
                                    <div className="mb-3 font-bold">Avatar Style</div>
                                    <Select
                                        defaultValue={{label: avatarDb.style.name, value: avatarDb.style.position}}
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
                                        defaultValue={{label: avatarDb.eyes[0], value: avatarDb.eyes[0]}}
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
                                    <PopoverPicker
                                        color={avatarBackgroundColor}
                                        onChange={(e) => setAvatarBackgroundColor(e.match(/#(\w+)/)[1])}
                                    />
                                </div>
                                <div className="col-12 mb-5">
                                    <div className="mb-3 font-bold">Mouth
                                    </div>
                                    <Select
                                        defaultValue={{label: avatarDb.mouth[0], value: avatarDb.mouth[0]}}
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
                                        defaultValue={{label: avatarDb.eyebrows[0], value: avatarDb.eyebrows[0]}}
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
                                        defaultValue={{label: avatarDb.features[0], value: avatarDb.features[0]}}
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
                                        defaultValue={{label: (avatarDb.flip[0]) ? "true" : "false", value: avatarDb.flip[0]}}
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
                                        defaultValue={{label: avatarDb.hair[0], value: avatarDb.hair[0]}}
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
                                    <PopoverPicker
                                        color={avatarHairColor}
                                        onChange={(e) => setAvatarHairColor(e.match(/#(\w+)/)[1])}
                                    />
                                </div>

                                <div className="col-12 mb-5">
                                    <div className="mb-3 font-bold">Earrings</div>
                                    <Select
                                        isDisabled={(avatarStylePosition !== 0)}
                                        defaultValue={{label: avatarDb.earrings[0], value: avatarDb.earrings[0]}}
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
                                        defaultValue={{label: avatarDb.glasses[0], value: avatarDb.glasses[0]}}
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
                                        defaultValue={{label: avatarDb.skinColor[0], value: avatarDb.skinColor[0]}}
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
                    <Button size="lg" className="btn-block mt-6" disabled={processing}>
                        Save Preferences
                    </Button>
                </form>
            </section>
        </SettingCard>
    )

}
