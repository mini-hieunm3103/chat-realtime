import React, {useCallback, useEffect, useState} from "react";
import {useFetch} from "@/Helper/hooks.js";
import {asset, isObjectEmpty, renameFileSize, shortenFileName} from "@/Helper/functions.js";
import LoadingDiv from "@/Components/LoadingDiv.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const Documents = ({channelId, targetMediaTabId}) => {
    const [documents, setDocuments] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    const {data: getChatStorageDocuments, isPending: loadChatStorageDocuments}
        = useFetch(route('channel.documents', {channel_id: channelId, page:pageNumber}))
    useEffect(() => {
        if (!isObjectEmpty(getChatStorageDocuments)){
            setDocuments(prevDocuments =>{
                return [...new Set([...prevDocuments, ...getChatStorageDocuments.data])]
            });
            setHasMore(pageNumber <= getChatStorageDocuments.meta.last_page)
        }
    }, [getChatStorageDocuments]);
    const fetchMoreDocuments = useCallback(() => {
        setPageNumber(prevState => prevState+1)
    })
    if (targetMediaTabId !== "render-chat-info-storage-documents") return false;
    return <ul className="list-group list-group-flush list-group-no-border-first">
        {documents.length===0 && !loadChatStorageDocuments
            ? <div>
                <h4>No Documents</h4>
                <p>Documents that you exchange with this group will appear here.</p>
            </div>
            : <InfiniteScroll
                next={fetchMoreDocuments}
                dataLength={documents.length}
                hasMore={hasMore}
                loader={<LoadingDiv/>}
                height="48rem"
                className="hide-scrollbar"
            >
                {documents.map(document => {
                    return <li className="list-group-item py-6 px-2">
                        <div className="media">
                            <div className="icon-shape bg-primary text-white mr-5">
                                <i className="fe-file"></i>
                            </div>
                            <div className="media-body align-self-center overflow-hidden">
                                <h6 className="text-truncate mb-0 text-reset">
                                    {shortenFileName(document.name, 15)}
                                </h6>
                                <ul className="list-inline d-flex justify-content-between small mb-0">
                                    <li className="list-inline-item">
                                        <span className="text-muted">{renameFileSize(document.size)}</span>
                                    </li>
                                    <li className="list-inline-item r">
                                        <span className="text-muted text-uppercase">{document.sendTime.day}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a title={document.name} href={asset(document.path)} className="stretched-link" target="_blank"
                           download={true}></a>
                    </li>
                })}
            </InfiniteScroll>
        }
    </ul>
}
export default React.memo(Documents)
