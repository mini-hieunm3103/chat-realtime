export function CopyMessageContentText ({message}) {
    const handleCopy = () => {
        navigator.clipboard.writeText(message.message_text);
    }
    return (
        <div className="dropdown-item d-flex align-items-center cursor-default" onClick={handleCopy}>
            Copy text <span className="ml-auto pl-5 fe-copy"></span>
        </div>
    )
}
