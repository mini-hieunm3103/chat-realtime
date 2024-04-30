import React, {useCallback, useEffect, useState} from "react";
import {useFetch} from "@/Helper/hooks.js";
import {isObjectEmpty} from "@/Helper/functions.js";
import LoadingDiv from "@/Components/LoadingDiv.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const Links = ({channelId, targetMediaTabId}) => {
    if (targetMediaTabId !== "render-chat-info-storage-links") return false;
    const [links, setLinks] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const {data: getGroupStorageLinks, isPending: loadGroupStorageLinks}
        = useFetch(route('channel.links', {channel_id: channelId, page: pageNumber}))
    useEffect(() => {
        if (!isObjectEmpty(getGroupStorageLinks)){
            setLinks(prevLinks =>{
                return [...new Set([...prevLinks, ...getGroupStorageLinks.data])]
            });
            setHasMore(pageNumber <= getGroupStorageLinks.meta.last_page)
        }
    }, [loadGroupStorageLinks]);
    const fetchMoreLinks = useCallback(() => {
        setPageNumber(prevState => prevState+1)
    })
    return (
        <ul className="list-group list-group-flush list-group-no-border-first">
            {links.length === 0 && !loadGroupStorageLinks
                ? <div>
                    <h4>No Links</h4>
                    <p>Links that you exchange with this group will appear here.</p>
                </div>
                : <InfiniteScroll
                    next={fetchMoreLinks}
                    dataLength={links.length}
                    hasMore={hasMore}
                    loader={<LoadingDiv/>}
                    height="48rem"
                    className="hide-scrollbar"
                >
                    {links.map(link => {
                        return (
                            <li className="list-group-item py-6 px-2">
                                <div className="media">
                                    <div className="icon-shape bg-primary text-white mr-4">
                                        <i className="fe-link-2"></i>
                                    </div>

                                    <div className="media-body align-self-center overflow-hidden">
                                        <h6 className="text-truncate mb-0 text-reset">
                                        <span>
                                            {link.url}
                                        </span>
                                        </h6>
                                    </div>
                                </div>
                                <a href={link.url} className="stretched-link" target="_blank"></a>
                            </li>
                        )
                    })}
                </InfiniteScroll>
            }


        </ul>
    )
}
export default React.memo(Links)
