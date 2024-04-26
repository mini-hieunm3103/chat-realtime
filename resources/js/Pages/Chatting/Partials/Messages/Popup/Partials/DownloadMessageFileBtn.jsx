import {asset} from "@/Helper/functions.js";

export default function DownloadMessageFileBtn({message}) {
    return (
        <a className="dropdown-item d-flex align-items-center cursor-pointer" download={true} href={asset(message.message_file.path)}>
            Download <span className="ml-auto pl-5 fe-download"></span>
        </a>
    )
}
