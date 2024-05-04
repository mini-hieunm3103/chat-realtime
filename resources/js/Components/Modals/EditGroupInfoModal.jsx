import Button from "@/Components/Button.jsx";
import {useForm} from "@inertiajs/react";
import BaseModal from "@/Components/Modals/Base/BaseModal.jsx";
import React, {useEffect, useRef, useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import ConfirmModal from "@/Components/Modals/ConfirmModal.jsx";
import {useToggle} from "@/Helper/hooks.js";
import {asset, groupAvatarText, shortenFileName} from "@/Helper/functions.js";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import Swal from "sweetalert2";
import {maxAvatarFileSize, validAvatarFileType} from "@/Helper/config.js";

const EditGroupInfoModal = ({isShowing, hide, groupDetail}) => {
    const selectedFileInputRef = useRef(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const {on: openConfirmDeleteAvatarModal, toggle: toggleOpenConfirmDeleteAvatarModal} = useToggle()
    const {on: isConfirmDeleteAvatarAction, toggle: toggleConfirmDeleteAvatarAction} = useToggle()
    const {data, setData, post, processing, errors} = useForm({
        group_id: groupDetail.id,
        avatar_file: null,
        name: groupDetail.name,
    })
    const {data: deleteData,delete: deleteAvatar, recentlySuccessful: deleteAvatarSuccessfully} = useForm({
        group_id: groupDetail.id
    })
    const [errorAvatarFile, setErrorAvatarFile] = useState({
        fileSizeError: false,
        fileTypeError: false,
    })
    useEffect(() => {
        if (!errorAvatarFile.fileSizeError && !errorAvatarFile.fileTypeError) {
            setData("avatar_file", avatarFile)
        }
    }, [avatarFile]);
    useEffect(() => {
        if (isConfirmDeleteAvatarAction)
            deleteAvatar(route('group.deleteAvatar'), {
                onSuccess: ()=> {
                    toggleOpenConfirmDeleteAvatarModal();
                    Swal.fire({
                        position: "top-end",
                        icon: "success" ,
                        title: "Delete Group Avatar Successfully",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    setTimeout(()=> {
                        location.reload()
                    }, 3000)
                }
            })
    }, [isConfirmDeleteAvatarAction]);
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
    }
    const onChooseFile = () =>
        selectedFileInputRef.current.click();
    const handleRemoveFile = () => {
        if (!avatarFile && groupDetail.avatar)
            toggleOpenConfirmDeleteAvatarModal()
        setAvatarFile(null)
        setErrorAvatarFile({
            fileSizeError: false,
            fileTypeError: false,
        })
    }
    const submit = (e) => {
        e.preventDefault();
        post(route('group.update'), {
            onSuccess: ()=> {
                Swal.fire({
                    position: "top-end",
                    icon: "success" ,
                    title: "Update Group Avatar Successfully",
                    showConfirmButton: false,
                    timer: 2500
                });
                setTimeout(()=> {
                    location.reload()
                }, 3000)
            }
        })
    }
    return (
        <BaseModal
            isShowing={isShowing}
            hide={hide}
        >
            <ConfirmModal
                ConfirmBtn={<button type="button" className="btn btn-danger" onClick={toggleConfirmDeleteAvatarAction}>Delete</button>}
                noticeMessage="Delete current avatar?"
                isShowing={openConfirmDeleteAvatarModal}
                hide={toggleOpenConfirmDeleteAvatarModal}
            />
            <div className="modal-content">
                <div className="modal-header">
                    <div className="media flex-fill">
                        <div className="icon-shape rounded-lg bg-primary text-white mr-5">
                            <i className="fe-users"></i>
                        </div>
                        <div className="media-body align-self-center">
                            <h5 className="modal-title">Group Info</h5>
                            <p className="small">You can customize group info</p>
                        </div>
                    </div>

                    <button onClick={hide} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={submit}>
                    <div className="modal-body">
                        <div className="d-flex h-100 flex-column">
                            <div className="hide-scrollbar flex-fill">
                                <div className="container-fluid border-bottom ">
                                    <div
                                        className="text-center pb-6 px-10 d-flex justify-content-center align-items-center">
                                        <div
                                            className={"cursor-default avatar avatar-xl  mr-6" + ((!data.avatar_file) ? " bg-success text-white " : " ")}>
                                            {(avatarFile || groupDetail.avatar)
                                                ? <img className="avatar-img border border-primary"
                                                       src={(avatarFile) ? URL.createObjectURL(avatarFile) : asset(groupDetail.avatar.path)}
                                                       alt={groupDetail.name}/>
                                                : <span style={{
                                                    fontSize: 32,
                                                    fontWeight: "bold"
                                                }}>{groupAvatarText(groupDetail.name)}</span>}
                                        </div>
                                        <h5 className="m-0">{groupDetail.name}</h5>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <InputLabel value="Avatar" className="small"/>
                            <div className="custom-selected-file col-12 form-control-lg pl-4">
                                <div className="choose-file btn px-4 py-1 col-auto" onClick={onChooseFile}>
                                    <span>Choose file</span>
                                </div>
                                <p className="file-name m-0 ml-3 text-truncate text-center">{(avatarFile) ? shortenFileName(avatarFile.name) : ((groupDetail.avatar) ? shortenFileName(groupDetail.avatar.name) : null)}</p>
                                <div className={"trash btn " + ((!avatarFile && !groupDetail.avatar) ? "d-none" : "")}
                                     onClick={handleRemoveFile}
                                >
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
                        <div
                            className="d-flex flex-md-column align-content-end mr-auto ml-auto justify-content-start flex-wrap-reverse">
                            <span
                                className={"mb-3 ml-4 " + ((errorAvatarFile.fileTypeError) ? "text-danger" : ((avatarFile) ? "text-success" : ""))}>
                                <i className={`fe-${(!errorAvatarFile.fileTypeError && avatarFile) ? "check" : "alert"}-circle mr-2`}></i>
                                Only JPEG, PNG, and GIF images are allowed.
                            </span>
                            <span
                                className={"mb-3 ml-4 " + ((errorAvatarFile.fileSizeError) ? "text-danger" : ((avatarFile) ? "text-success" : ""))}>
                                <i className={`fe-${(!errorAvatarFile.fileSizeError && avatarFile) ? "check" : "alert"}-circle mr-2`}></i>
                                Max file size 3mb.
                            </span>
                        </div>
                        <div className="form-group mb-0">
                            <InputLabel htmlFor="name" value="Name" className="small"/>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                error={errors.name}
                                placeholder="Group Name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button size="lg" className="modal-footer btn-block d-flex align-items-center"
                                disabled={processing}>
                            Save preferences
                            <i className="fe-edit ml-auto"></i>
                        </Button>
                    </div>
                </form>
            </div>
        </BaseModal>
    )
}
export default EditGroupInfoModal;
