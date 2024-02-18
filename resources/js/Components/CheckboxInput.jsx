export default function CheckboxInput({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "custom-control-input" +
                className
            }
        />
    );
}
