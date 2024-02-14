export default function InputError({ message, className = '', ...props }) {
    if (message && Array.isArray(message)){
        return (
            message.map((e, i) => {
                return (
                    <>
                        <p key={i} {...props} className={'text-danger ' + className}>
                            {e}
                        </p>
                    </>
                );
        }))
    } else if(message) {
        return (<p {...props} className={'text-danger ' + className}>{message}</p>)
    } else {
        return null;
    }
}
