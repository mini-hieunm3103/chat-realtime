import {useEffect, useState} from 'react';
import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";
import {useForm, usePage} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextareaInput from "@/Components/TextareaInput.jsx";
import Button from "@/Components/Button.jsx";
import {Transition} from "@headlessui/react";

export default function Authenticated({user,  showStatus, currentRoute, children , open= false}) {
    const { data, setData, post, transform, errors, processing, recentlySuccessful } = useForm({
        emails: '',
        emailArr: [],
        messages:'',
    });
    const isEmail = (email, getValue = false) => {
        const check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        if (check && getValue) {
            return email
        } else {
            return check
        }
    };
    // lấy ra email bị lỗi bên trong emailArr sau khi xử lý ở back-end
    function hasEmailArrProperty(obj, getValue = true) {
        const result = []
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop) && prop.match(/^emailArr\.\d+$/)) {
                result.push(obj[prop]);
            }
        }
        return (result.length)
            ? (getValue) ? result : true
            : false ;
    }
    const submit = (e) => {
        e.preventDefault();
        post('/user/invite-friend');
    };
    return (
        <>
            <Navbar
                route={currentRoute}
            />
            <Sidebar
                user={user}
                route={currentRoute}
            />
            <div className={"main " + ((open) ? " main-visible" : null)} data-mobile-height="">
                {children}
            </div>
            <div className="modal fade" id="invite-friends" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <div className="media flex-fill">
                                <div className="icon-shape rounded-lg bg-primary text-white mr-5">
                                    <i className="fe-users"></i>
                                </div>
                                <div className="media-body align-self-center">
                                    <h5 className="modal-title">Invite friends</h5>
                                    <p className="small">Invite colleagues, clients and friends to join our app</p>
                                </div>
                            </div>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <InputLabel htmlFor="invite-email" value="Emails (Max: 3)" className="small"/>

                                    <TextInput
                                        id="invite-email"
                                        name="emails"
                                        value={data.emails}
                                        error={errors.emails || errors.emailArr ||  hasEmailArrProperty(errors, false)}
                                        placeholder="Example: mail.1@gmail.com, mail.2@gmail.com, ..."
                                        isFocused={true}
                                        onChange={(e) => {
                                            setData(previousData => ({
                                                ...previousData,
                                                emails: e.target.value,
                                                emailArr: e.target.value.split(', ')
                                            }))
                                        }}
                                    />

                                    {
                                        (data.emails)
                                            ? (
                                                <ul className={ "mt-4 " + ((data.emailArr.length > 3) ? "text-danger" :null)}>
                                                    {data.emailArr.map((e, i) => {
                                                        return <li className={(!isEmail(e) ) ? "text-danger" : null} key={i}>{e}</li>
                                                    })}
                                                </ul>
                                            )
                                            : null
                                    }
                                    <InputError message={ errors.emailArr || hasEmailArrProperty(errors) } className="m-0"/>

                                </div>

                                <div className="form-group mb-0">
                                    <InputLabel htmlFor="invite-message" value="Invitation message"
                                                className="small"/>
                                    <TextareaInput
                                        id="invite-message"
                                        name="message"
                                        value={data.messages}
                                        onChange={(e) => setData('messages', e.target.value)}
                                        error={errors.messages}
                                        data-autosize="true"
                                    />
                                    <InputError message={errors.messages } className="mt-2"/>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <Button  size="lg" className="modal-footer btn-block d-flex align-items-center" disabled={processing}>
                                    Invite friend
                                    <i className="fe-user-plus ml-auto"></i>
                                </Button>
                            </div>
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

                    </div>
                </div>
            </div>
        </>
    );
}
