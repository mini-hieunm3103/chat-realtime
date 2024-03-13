import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";

export default function LinkCS({}) {
    return (
        <BaseChatSidebar.ChildrenCS childrenCSId="render-links">
            <BaseChatSidebar.Header>
                <ul className="nav justify-content-between align-items-center">
                    <li className="nav-item">
                        <BaseChatSidebar.TriggerChildrenCS
                            isOpen={false}
                            className="nav-link text-muted px-0"
                            childrenCSId="add-user"
                        >
                            <i className="icon-md fe-chevron-left"></i>
                        </BaseChatSidebar.TriggerChildrenCS>
                    </li>

                    <li className="text-center d-block ">
                        <h6 className="mb-n2">Storage</h6>
                        <small className="text-muted">Show Links</small>
                    </li>

                    <li className="nav-item invisible">
                        <i className="icon-md fe-x"></i>
                    </li>
                </ul>

            </BaseChatSidebar.Header>
            <BaseChatSidebar.Body>
                <div className="border-bottom py-7">
                    <div className="container-fluid">

                        <h1>Có thể làm tương tự zalo</h1>

                    </div>
                </div>
                <form action="#">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item py-4">
                            <small className="text-uppercase">A</small>
                        </li>


                        <li className="list-group-item py-6">
                            <div className="media align-items-center">


                                <div className="avatar avatar-sm avatar-online mr-5">
                                    <img className="avatar-img" src="assets\images\avatars\10.jpg"
                                         alt="Anna Bridges"/>
                                </div>


                                <div className="media-body">
                                    <h6 className="mb-0">Anna Bridges</h6>
                                    <small className="text-muted">Online</small>
                                </div>

                                <div className="align-self-center ml-auto">
                                    <div className="custom-control custom-checkbox">
                                        <input className="custom-control-input"
                                               id="id-add-user-chat-1-user-1" type="checkbox"/>
                                        <label className="custom-control-label"
                                               htmlFor="id-add-user-chat-1-user-1"></label>
                                    </div>
                                </div>

                            </div>

                            <label className="stretched-label" htmlFor="id-add-user-chat-1-user-1"></label>
                        </li>
                    </ul>
                </form>
            </BaseChatSidebar.Body>
            <BaseChatSidebar.Footer>
                <button className="btn btn-lg btn-block btn-primary d-flex align-items-center"
                        type="submit">
                    Add members
                    <span className="fe-user-plus ml-auto"></span>
                </button>
            </BaseChatSidebar.Footer>
        </BaseChatSidebar.ChildrenCS>
    )
}
