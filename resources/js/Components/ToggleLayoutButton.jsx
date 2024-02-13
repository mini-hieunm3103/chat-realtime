import {useLocation} from "react-router-dom";

export default function ToggleLayoutButton({icon="chevron-left", size="md", btnClass=" text-muted px-0"}){
    const backToLayout = () => {
        document.querySelector('.main').classList.toggle('main-visible');
    }
    return (
            <button className={"btn btn-link " +btnClass} onClick={backToLayout} data-chat="open">
                <i className={"icon-" + size + " " + "fe-" + icon}></i>
            </button>
        )
}
