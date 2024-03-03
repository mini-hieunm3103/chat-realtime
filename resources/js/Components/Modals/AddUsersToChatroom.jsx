
export default function AddUsersToChatroom(){
    console.log('a')
    return (
        <div className="modal fade" id="invs" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <div className="media flex-fill">
                            <div className="icon-shape rounded-lg bg-primary text-white mr-5">
                                <i className="fe-users"></i>
                            </div>
                            <div className="media-body align-self-center">
                                <h5 className="modal-title">Invite friends</h5>
                                <p className="small">Invite colleagues, clients and friends.</p>
                            </div>
                        </div>

                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <form action="#">
                            <div className="form-group">
                                <label htmlFor="invite-email" className="small">Email</label>
                                <input type="text" className="form-control form-control-lg" id="invite-email" />
                            </div>

                            <div className="form-group mb-0">
                                <label htmlFor="invite-message" className="small">Invitation message</label>
                                <textarea className="form-control form-control-lg" id="invite-message" data-autosize="true"></textarea>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-lg btn-block btn-primary d-flex align-items-center">
                            Invite friend
                            <i className="fe-user-plus ml-auto"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
