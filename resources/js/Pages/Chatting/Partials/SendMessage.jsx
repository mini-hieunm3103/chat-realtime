import React from "react";
import {useForm} from "@inertiajs/react";
import TextareaInput from "@/Components/Input/TextareaInput.jsx";


const SendMessage = ({channelId, channelType}) => {
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        message: '',
        channel_id: channelId,
        channel_type: channelType,
    });
    const sendMessage = (e) => {
        e.preventDefault()

        post(route('message.postMessage'), {
            onSuccess: ()=> {reset('message')}
        })
    }
    return (
        <div id="" className="chat-footer border-top py-4 py-lg-6 px-lg-8">
            <div className="container-xxl">
                <form onSubmit={sendMessage} className="border-0">
                    <div className="form-row align-items-center">
                        <div className="col">
                            <div className="input-group">
                                <TextareaInput
                                    id="chat-id-2-input"
                                    className={" bg-transparent border-0 "}
                                    placeholder="Type your message..." rows="1" data-emoji-input=""
                                    autoSize={true}
                                    error={errors.message}
                                    value={data.message}
                                    onChange={(e)=>{setData('message',e.target.value)}}
                                />
                            </div>
                        </div>

                        <div className="col-auto">
                            <button className="btn btn-ico btn-primary rounded-circle" type="submit">
                                <span className="fe-send"></span>
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(SendMessage)
