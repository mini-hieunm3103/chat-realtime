import {useForm} from "@inertiajs/react";
import React, { useEffect, useRef} from "react";

const RecallMessageForm = ({recallMessageId, setRecallMessageId, setIsRecallSuccessfully}) => {
    const {data, setData, patch} = useForm({
        message_id: 0,
    })
    const submitFormBtn = useRef(null)
    useEffect(() => {
        setData("message_id",recallMessageId)
        if (data.message_id > 0) {
            submitFormBtn.current.click()
        }
    }, [recallMessageId, data.message_id]);
    const submit = (e) => {
        e.preventDefault();
        patch(route('message.recallMessage'), {
            onSuccess: ()=> {
                if (recallMessageId>0){
                    setIsRecallSuccessfully(true)
                }
            }
        });
    }
    return (
        <form className="d-none" onSubmit={submit}>
            <input type="hidden" value={recallMessageId}/>
            <button type="submit" className="" ref={submitFormBtn} />
        </form>
    )
}
export default React.memo(RecallMessageForm)
