import { useState } from 'react';

const useChatSidebar = () => {
    const [open, setOpen] = useState(false);
    function toggleOpen() {
        setOpen(!open);
    }
    return {
        open,
        toggleOpen,
    }
};

export default useChatSidebar;
