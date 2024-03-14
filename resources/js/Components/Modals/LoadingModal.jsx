import BaseModal from "@/Components/Modals/Base/BaseModal.jsx";

export default function LoadingModal({isShowing, hide}) {
    // khi mà click outside modal thì k được close loading modal
    return (
        <BaseModal
            isShowing = {isShowing}
            hide = {hide}
        >
            <div className="modal-content">
                <div className="modal-body text-center">
                    <div className="loading-spinner mb-2"></div>
                    <div>Loading</div>
                </div>
            </div>
        </BaseModal>
)
}
