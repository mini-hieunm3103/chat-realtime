import React, {useCallback, useEffect, useState} from "react";
import {useFetch} from "@/Helper/hooks.js";
import {asset, isObjectEmpty} from "@/Helper/functions.js";
import LoadingDiv from "@/Components/LoadingDiv.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const Media = ({channelId, targetMediaTabId}) => {
    const [media, setMedia] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const {data: getChatStorageMedia, isPending: loadChatStorageMedia}
        = useFetch(route('channel.media', {channel_id: channelId, page:pageNumber}))
    useEffect(() => {
        if (!isObjectEmpty(getChatStorageMedia)){
            setMedia(prevMedia =>{
                return [...new Set([...prevMedia, ...getChatStorageMedia.data])]
            });
            setHasMore(pageNumber <= getChatStorageMedia.meta.last_page)
        }
    }, [getChatStorageMedia]);
    const fetchMoreMedia = useCallback(() => {
        setPageNumber(prevState => prevState+1)
    })
    if (targetMediaTabId !== "render-chat-info-storage-media") return false;
    return (
        <>
            <ul className="list-group list-group-flush">
                {media.length === 0 && !loadChatStorageMedia
                    ? <div>
                        <h4>No media</h4>
                        <p>Photos and videos that you exchange with this group will appear here.</p>
                    </div>
                    : <InfiniteScroll
                        next={fetchMoreMedia}
                        dataLength={media.length}
                        hasMore={hasMore}
                        loader={<LoadingDiv/>}
                        height="48rem"
                        className="hide-scrollbar"
                    >
                        <div className=" d-flex flex-wrap justify-content-start align-content-start">
                            {media.map(item => {
                                if (item.type === "image") {
                                    return (
                                        <div className="media-store">
                                            <div className="px-3 py-3">
                                                <img style={{height: 87, width: 87}}
                                                     loading="lazy"
                                                     className=""
                                                     data-action="zoom"
                                                     src={asset(item.file.path)}
                                                     alt={item.file.name}/>
                                            </div>
                                        </div>
                                    )
                                } else if (item.type === "video") {
                                    return (<div className="media-store">
                                        <div className="px-3 py-3">
                                            <video width="87px" height="87px">
                                                <source src={asset(item.file.path)}/>
                                            </video>
                                        </div>
                                    </div>)
                                }
                            })}
                        </div>
                    </InfiniteScroll>
                }
            </ul>
        </>

    )
}
export default React.memo(Media)
