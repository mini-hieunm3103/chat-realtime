import BaseModal from "@/Components/Modals/Base/BaseModal.jsx";

/*
* How to use this component:
- In parent component
+ define [isConfirmAction, setIsConfirmAction] = useState(false)
+ call
<ConfirmModal
    ...
    ConfirmBtn =  <button type="button" className="btn btn-primary" onClick={()=> setIsConfirmAction(true)}>Save changes</button>
/>
*/
const ConfirmModal = (
    {
        noticeMessage,
        ConfirmBtn,
        isShowing,
        hide,
    }
) => {
    return (<BaseModal
        isShowing={isShowing}
        hide={hide}
    >
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body text-center">
                <p>{noticeMessage}</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={hide}>Close</button>
                {ConfirmBtn}
            </div>
        </div>
    </BaseModal>)
}
export default ConfirmModal
