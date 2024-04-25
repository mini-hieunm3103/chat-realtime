import SettingCard from "@/Pages/Setting/Partials/SettingCard.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm, usePage} from "@inertiajs/react";
import TextareaInput from "@/Components/Input/TextareaInput.jsx";
import Button from "@/Components/Button.jsx";
import {Transition} from "@headlessui/react";
import React, {useEffect, useRef, useState} from "react";
import {useToggle} from "@/Helper/hooks.js";
import {maxAvatarFileSize, validAvatarFileType} from "@/Helper/config.js";
import ConfirmModal from "@/Components/Modals/ConfirmModal.jsx";
import {asset} from "@/Helper/functions.js";

export default function UpdateDetailInformation({status, showStatus,  className = '' }){
    const user = usePage().props.auth.data;
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        isUpdateDetail: true,
        avatar_file: null,
        bio: user.bio,
        twitter: user.twitter,
        github: user.github,
        facebook: user.facebook
    });
    const {delete: deleteAvatar, recentlySuccessful: deleteAvatarSuccessfully} = useForm()
    const selectedFileInputRef = useRef(null)
    const {on: openConfirmDeleteAvatarModal, toggle: toggleOpenConfirmDeleteAvatarModal} = useToggle()
    const {on: isConfirmDeleteAvatarAction, toggle: toggleConfirmDeleteAvatarAction} = useToggle()
    const [avatarFile, setAvatarFile] = useState(null)
    const [errorAvatarFile, setErrorAvatarFile] = useState({
        fileSizeError: false,
        fileTypeError: false,
    })
    useEffect(() => {
        if (isConfirmDeleteAvatarAction)
            deleteAvatar(route('user.deleteAvatar'), {
                onSuccess: toggleOpenConfirmDeleteAvatarModal
            })
    }, [isConfirmDeleteAvatarAction]);
    useEffect(() => {
        if (!errorAvatarFile.fileSizeError && !errorAvatarFile.fileTypeError) {
            setData("avatar_file", avatarFile)
        }
    }, [avatarFile]);

    const handleOnChange = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) return;

        const isFileSizeAllowed = selectedFile.size <= maxAvatarFileSize;
        const isFileTypeAllowed = validAvatarFileType.includes(selectedFile.type)

        if (isFileTypeAllowed && isFileSizeAllowed){
            setAvatarFile(selectedFile)
        }
        setErrorAvatarFile({
            fileSizeError: !isFileSizeAllowed,
            fileTypeError: !isFileTypeAllowed
        })
    };
    const onChooseFile = () =>
        selectedFileInputRef.current.click();
    const handleRemoveFile = () => {
        if (!avatarFile && user.avatar)
            toggleOpenConfirmDeleteAvatarModal()
        setAvatarFile(null)
        setErrorAvatarFile({
            fileSizeError: false,
            fileTypeError: false,
        })
    }
    const submit = (e) => {
        e.preventDefault();
        post(route('user.updateDetails'), {
            onSuccess: () => {
                setAvatarFile(null)
                setErrorAvatarFile({
                    fileSizeError: false,
                    fileTypeError: false,
                })
                setData('avatar_file', null)
            }
        });
    };
    return (
        <SettingCard
            title="Social"
            dataTarget="profile-settings-social"
            icon="share-2"
        >
            <ConfirmModal
                ConfirmBtn={<button type="button" className="btn btn-danger" onClick={toggleConfirmDeleteAvatarAction}>Delete</button>}
                noticeMessage="Delete current avatar?"
                isShowing={openConfirmDeleteAvatarModal}
                hide={toggleOpenConfirmDeleteAvatarModal}
            />
            <section className={className}>
                <form onSubmit={submit}>
                    <div className="d-flex justify-content-start flex-wrap">
                        {/*    User Avatar*/}
                        <div
                            className={"cursor-default avatar avatar-xl mr-auto ml-auto " + ((!data.avatar_file) ? " bg-primary text-white " : " ")}>
                            {(avatarFile || user.avatar)
                                ? <img className="avatar-img border border-primary"
                                       src={(avatarFile) ? URL.createObjectURL(avatarFile) : asset(user.avatar.path)}
                                       alt={user.name}/>
                                : <span style={{fontSize: 38, fontWeight: "bold"}}>{user.name.charAt(0)}</span>}
                        </div>
                        <div className="d-flex flex-md-column align-content-center mr-auto ml-auto justify-content-center flex-wrap-reverse">
                            <span
                                className={"mb-3 mt-4 "+((errorAvatarFile.fileTypeError) ? "text-danger" : ((avatarFile) ? "text-success" : null))}>
                                <i className={`fe-${(!errorAvatarFile.fileTypeError && avatarFile) ? "check" : "alert"}-circle mr-2`}></i>
                                Only JPEG, PNG, and GIF images are allowed.
                            </span>
                            <span
                                className={"mb-3 mt-4 "+((errorAvatarFile.fileSizeError) ? "text-danger" : ((avatarFile) ? "text-success" : null))}>
                                <i className={`fe-${(!errorAvatarFile.fileSizeError && avatarFile) ? "check" : "alert"}-circle mr-2`}></i>
                                Max file size 3mb.
                            </span>
                        </div>
                    </div>
                    <div className="form-group mt-6">
                        <InputLabel value="Avatar" className="small"/>
                        <div className="custom-selected-file col-12 form-control-lg pl-4">
                            <div className="choose-file btn px-4 py-1 col-auto" onClick={onChooseFile}><span>Choose file</span>
                            </div>
                            <p className="file-name m-0 ml-3 text-truncate text-center">{(avatarFile) ? avatarFile.name : ((user.avatar) ? user.avatar.name : null)}</p>
                            <div className={"trash btn " + ((!avatarFile && !user.avatar) ? "d-none" : "")}
                                 onClick={handleRemoveFile}>
                                {avatarFile
                                    ? <i className="fe-x"></i>
                                    : <i className="fe-trash-2"></i>
                                }
                            </div>
                            <input
                                ref={selectedFileInputRef}
                                className="d-none"
                                onChange={handleOnChange}
                                type="file"/>
                        </div>
                    </div>
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
                        {deleteAvatarSuccessfully && showStatus("Delete your avatar successfully")}
                    </Transition>
                </form>
            </section>


        </SettingCard>
    )
}
