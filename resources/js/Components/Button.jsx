export default function Button({ className = '', color = 'primary', size='', disabled, children, ...props }){
    return (
        <button
            {...props}
            className={"btn btn-" + color + (size && " btn-"+size) + " " + className}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
