import {useEffect, useState} from "react";
export default function useEchoChatUsersId() {
    return () => {
        const [allUsersOnlineId, setAllUsersOnlineId] = useState([]);

        useEffect(() => {
            Echo.join('chat')
                .here(users => {
                    setAllUsersOnlineId(users)
                })
                .joining(user => {
                    if (!allUsersOnlineId.includes(user)){
                        setAllUsersOnlineId(prevState => [...prevState, user] )
                    }
                })
                .leaving(user => {
                    setTimeout(()=> {
                        setAllUsersOnlineId(prevState => prevState.filter(item => item !== user))
                    }, 300000)
                });
        }, []);
        return allUsersOnlineId;
    };
}
// ở đây khởi tạo 1 hook mới
/*
* Gọi ra hook mới:

import useEchoChatUsersId from "@/Helper/EchoInit.jsx";
function YourComponent() => {
    const allUsersOnlineId = useEchoChatUsersId()();

    useEffect(() => {
        console.log(allUsersOnlineId);
    }, [allUsersOnlineId]);
}
* cặp () lần 1 để gọi hook | cặp () sẽ lấy ra giá trị return bên trong return của hook
* khi đó biến allUserOnline sẽ nhận những users khi:
* đang online: <here>
* mới vào <joining>

- setTimeout là để khi người dùng redirect đến 1 link mới bên trong trang web thì sẽ không bị hiện là đã left channel:
- khi redirect đến trang khác ( kể cả đang trong chính trang web này thì nó sẽ left channel (ở đây là chat)
- khi left channel thì sẽ bị sửa lại thành offline nhưng do người duùng vâẫn ở web này nên lại hiện thành online => không hay
- Cách tối ưu hơn là lưu vào cache
* */
