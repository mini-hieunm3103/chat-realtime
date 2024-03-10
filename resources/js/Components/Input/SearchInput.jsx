import React from "react";


const SearchBtn = (
    {
        // params?
    }
) => {
    return (
        <button
            className="btn btn-lg btn-ico btn-secondary btn-minimal"
            type="submit"
        >
            <i className="fe-search"></i>
        </button>
    )
}

export default function SearchInput(
    {
        keyword,
        setKeyword,
        placeHolder,
        className
    }
) {
    return (
        <div className={"input-group " + className}>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text" className="form-control form-control-lg" placeholder={placeHolder}
                aria-label={placeHolder}/>
            <div className="input-group-append">
                <SearchBtn />
            </div>
        </div>
    )
}
