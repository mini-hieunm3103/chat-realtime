import React from 'react';
import ReactDOM from 'react-dom';

export default function BaseModal ({isShowing, hide, children}) {
    const bodyClass = document.body.classList
    if (isShowing) {
        bodyClass.add('model-open')
    } else {
        bodyClass.remove('model-open')
    }

    return isShowing
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="modal fade show" tabIndex="-1" role="dialog"
                     style={{display: "block"}} aria-modal="true" onClick={hide}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document" onClick={(e)=> {e.stopPropagation()}}>
                        {children}
                    </div>
                </div>
                <div className="modal-backdrop fade show" onClick={hide}></div>
            </React.Fragment>, document.querySelector('#app'))
        : null;
}
