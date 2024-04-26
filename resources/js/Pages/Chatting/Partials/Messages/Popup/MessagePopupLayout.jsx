const MessagePopupLayout = ({children}) => {
    return (
        <div className={"dropdown mr-5 ml-5"}>
            <a className="text-muted opacity-60" href="#" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
                <i className="fe-more-vertical"></i>
            </a>

            <div className="dropdown-menu">
                {children}
            </div>
        </div>
    )
}
let HorizontalLine = ({width = "112px"}) => {
    return (
        <hr style={{
            marginTop: "0.9rem",
            marginBottom: ".5rem",
            width: {width},
            borderTop: "1px solid rgba(124, 117, 125, .5)"
        }}/>
    )
}
MessagePopupLayout.HorizontalLine = HorizontalLine;
export default MessagePopupLayout;
