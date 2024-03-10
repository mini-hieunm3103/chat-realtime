export default function DropdownMessage(){
    return (
        <div className="dropdown">
            <a className="text-muted opacity-60 ml-3" href="#" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
                <i className="fe-more-vertical"></i>
            </a>

            <div className="dropdown-menu">
                <a className="dropdown-item d-flex align-items-center" href="#">
                    Edit <span className="ml-auto fe-edit-3"></span>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    Share <span className="ml-auto fe-share-2"></span>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    Delete <span className="ml-auto fe-trash-2"></span>
                </a>
            </div>
        </div>
    )
}
