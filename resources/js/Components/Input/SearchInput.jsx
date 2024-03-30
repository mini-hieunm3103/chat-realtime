import React, {useRef} from "react";


export default function SearchInput({keyword, setKeyword, placeHolder, className, inputSize="form-control-lg"})
{
    const clearSearch = () => {
        setKeyword("")
    }
    return (
        <div className={"input-group " + className}>
            <div className="input-group-prepend">
                <button className="btn btn-lg btn-ico btn-secondary btn-minimal">
                    <i className="fe-search"></i>
                </button>
            </div>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text" className={"form-control " + inputSize} placeholder={placeHolder}
                aria-label={placeHolder}/>

            {(keyword.length !== 0) &&
                <div className="input-group-append">
                    <button
                        className="btn btn-lg btn-ico btn-secondary btn-minimal"
                        onClick={clearSearch}
                    >
                        <i className="fe-x"></i>
                    </button>
                </div>
            }
        </div>
    )
}
