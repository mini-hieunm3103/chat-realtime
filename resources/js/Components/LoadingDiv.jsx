export default function LoadingDiv({className}){
    return (
        <div className={"d-flex justify-content-center align-items-center " + className}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
