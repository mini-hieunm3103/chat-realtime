import React from 'react';
import {asset} from "@/Helper/functions.js";

const Like = ({...props}) => {
    const src = '/emoji/like.png'
    return (
        <img src={asset(src)}
             alt="👍"
             {...props}
        />
    )
}
export default React.memo(Like)
