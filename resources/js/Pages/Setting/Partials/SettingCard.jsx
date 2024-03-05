export default function SettingCard({title, description="Update your profile details.", icon, dataTarget, children}){
    return (
        <div className="card mb-6 mb-lg-8">
            <div className="card-header position-relative d-block stretched-link">
                <div className="row no-gutters align-items-center">
                    <div className="col">
                        <h5>{title}</h5>
                        <p>{description}</p>
                    </div>

                    <div className="col-auto">
                        <i className={`text-muted icon-md fe-${icon}`}></i>
                    </div>
                </div>
            </div>

            <div id={dataTarget} className="" data-parent="#profile-settings">
                <div className="card-body">
                    {children}
                </div>
            </div>

        </div>
    )
}
