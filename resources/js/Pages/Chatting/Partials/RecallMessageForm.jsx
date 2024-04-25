import {useForm} from "@inertiajs/react";
import React, { useEffect, useRef} from "react";

const RecallMessageForm = ({recallMessageId, channelId, setIsRecallSuccessfully}) => {
    const {data, setData, patch, reset} = useForm({
        message_id: 0,
        channel_id: channelId
    })
    const submitFormBtn = useRef(null)
    useEffect(() => {
        setData("message_id",recallMessageId)
    }, [recallMessageId]);
    useEffect(() => {
        if (data.message_id > 0){
            submitFormBtn.current.click()
        }
    }, [data.message_id]);
    const submit = (e) => {
        e.preventDefault();
        patch(route('message.recallMessage'), {
            onSuccess: ()=> {
                setIsRecallSuccessfully(true)
                reset("message_id")
            }
        });
    }
    return (
        <form className="d-none" onSubmit={submit}>
            <button type="submit" className="" ref={submitFormBtn} />
        </form>
    )
}
export default React.memo(RecallMessageForm)
