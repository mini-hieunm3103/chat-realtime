
const RecallMessageBtn = ({messageId, setRecallMessageId}) => {
    return (
        <div onClick={() => {
            setRecallMessageId(messageId)
        }}
             className="dropdown-item d-flex align-items-center text-danger cursor-pointer">
            Recall <span className="ml-auto pl-5 fe-rotate-ccw"></span>
        </div>
    )
}
export default RecallMessageBtn
