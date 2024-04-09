import {useEffect, useState} from "react";

export default function TextMessagePopup({copyText}){
    const handleCopy = () => {
        navigator.clipboard.writeText(copyText);
    }
    return (
        <div className="dropdown">
            <a className="text-muted opacity-60 ml-3" href="#" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false" >
                <i className="fe-more-vertical"></i>
            </a>

            <div className="dropdown-menu">
                <div className="dropdown-item d-flex align-items-center cursor-default"  onClick={handleCopy}>
                    Copy text <span className="ml-auto pl-5 fe-copy"></span>
                </div>
                <hr style={{
                    marginTop: "0.9rem",
                    marginBottom: ".5rem",
                    width: "112px",
                    borderTop: "1px solid rgba(124, 117, 125, .5)"
                }}/>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    View details <span className="ml-auto pl-5 fe-alert-octagon"></span>
                </a>
                <hr style={{
                    marginTop: "0.9rem",
                    marginBottom: ".5rem",
                    width: "112px",
                    borderTop: "1px solid rgba(124, 117, 125, .5)"
                }}/>
                <a className="dropdown-item d-flex align-items-center text-danger" href="#">
                    Recall <span className="ml-auto pl-5 fe-rotate-ccw"></span>
                </a>
                <a className="dropdown-item d-flex align-items-center text-danger" href="#">
                    Delete <span className="ml-auto pl-5 fe-trash-2"></span>
                </a>
            </div>
        </div>
    )
}
