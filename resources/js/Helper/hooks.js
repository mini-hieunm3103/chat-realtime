import {useEffect, useState} from "react";

export const useOpen = () => {
    const [open, setOpen] = useState(false);
    function toggle() {
        setOpen(!open);
    }
    return {
        open,
        toggle,
    }
};
export const useClickOutside = (ref, handler) => {
    // Improved version of https://usehooks.com/useOnClickOutside/
    useEffect(() => {
        let startedInside = false;
        let startedWhenMounted = false;

        const listener = (event) => {
            // Do nothing if `mousedown` or `touchstart` started inside ref element
            if (startedInside || !startedWhenMounted) return;
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) return;

            handler(event);
        };

        const validateEventStart = (event) => {
            startedWhenMounted = ref.current;
            startedInside = ref.current && ref.current.contains(event.target);
        };

        document.addEventListener("mousedown", validateEventStart);
        document.addEventListener("touchstart", validateEventStart);
        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("mousedown", validateEventStart);
            document.removeEventListener("touchstart", validateEventStart);
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
};
export const  useEchoChatUsersId = () =>  {
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
}

export const useGetUsers = () =>  {
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
/*
lấy ra users theo:
- justOnline = true: chỉ lấy ra users online, offline không lấy => render list users trong dialog sidebar
- justOnline = false: lấy ra all users và chuyển user.online thành 1 để nhận biết user nào đang online và sẽ thực hiện filter theo keyword
- sẽ cập nhâtj môỗi khi keyword và allUsersOnlineId thay đổi
* */
}
