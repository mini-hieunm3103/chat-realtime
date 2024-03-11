import React, {useRef} from "react";


export default function SearchInput({keyword, setKeyword, placeHolder, className})
{
    const clearSearch = () => {
        setKeyword("")
    }
    return (
        <div className={"input-group " + className}>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text" className="form-control form-control-lg" placeholder={placeHolder}
                aria-label={placeHolder}/>
            <div className="input-group-append">
                <button
                    className="btn btn-lg btn-ico btn-secondary btn-minimal"
                    type="submit"
                >
                    <div className="d-flex">
                        <div className="mr-4" onClick={clearSearch}>
                            <i className="fe-x"></i>
                        </div>
                        <div>
                            <i className="fe-search"></i>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}
