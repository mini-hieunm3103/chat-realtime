import {useState, useEffect} from "react";
import useEchoChatUsersId from "@/Helper/useEchoChatUsersId.jsx";
export default function useGetUsers() {
    const allUsersOnlineId = useEchoChatUsersId()();

    return (keyword, justOnline = false) => {
        const [allUsers, setAllUsers] = useState([])
        useEffect(() => {
            if (justOnline && allUsersOnlineId.length){
                fetch(route('user.get-all-users', {online: allUsersOnlineId}))
                    .then(res => res.json())
                    .then((data)=> {
                        setAllUsers(data.data)
                    })
            } else if (!justOnline) {
                fetch(route('user.get-all-users', {keyword: keyword}))
                    .then(res => res.json())
                    .then((data)=> {
                        data.data.map(e => {
                            if (allUsersOnlineId.includes(e.id)){
                                e.online = 1
                            }
                        })
                        setAllUsers(data.data)
                    })
            }
        }, [keyword, allUsersOnlineId]);
        return allUsers;
    }
}
/*
lấy ra users theo:
- justOnline = true: chỉ lấy ra users online, offline không lấy => render list users trong dialog sidebar
- justOnline = false: lấy ra all users và chuyển user.online thành 1 để nhận biết user nào đang online và sẽ thực hiện filter theo keyword
- sẽ cập nhâtj môỗi khi keyword và allUsersOnlineId thay đổi
* */
