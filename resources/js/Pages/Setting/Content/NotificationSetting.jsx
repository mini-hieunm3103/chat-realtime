import SettingCard from "@/Pages/Setting/Partials/SettingCard.jsx";

export default function NotificationSetting({}){
    return (
        <SettingCard
            title="Notifications"
            icon="bell"
            dataTarget="profile-settings-notifications"
        >
            <ul className="list-group list-group-flush">
                <li className="list-group-item pt-0 px-0">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="mb-0">Sound</h6>

                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="custom-switch-1"/>
                            <label className="custom-control-label" htmlFor="custom-switch-1"></label>
                        </div>
                    </div>
                    <p>Update your profile details.</p>
                </li>

                <li className="list-group-item px-0">
                    <div className="d-flex justify-content-between mb-2">
                        <h6 className="mb-0">Exceptions</h6>

                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="custom-switch-2"/>
                            <label className="custom-control-label" htmlFor="custom-switch-2"></label>
                        </div>
                    </div>
                    <p>Update your profile details.</p>
                </li>

                <li className="list-group-item px-0">
                    <div className="d-flex justify-content-between mb-2">
                        <h6 className="mb-0">Message preview</h6>

                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="custom-switch-3"/>
                            <label className="custom-control-label" htmlFor="custom-switch-3"></label>
                        </div>
                    </div>
                    <p>Update your profile details.</p>
                </li>

                <li className="list-group-item pb-0 px-0">
                    <div className="d-flex justify-content-between mb-2">
                        <h6 className="mb-0">Show notifications</h6>

                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="custom-switch-4"/>
                            <label className="custom-control-label" htmlFor="custom-switch-4"></label>
                        </div>
                    </div>
                    <p>Update your profile details.</p>
                </li>
            </ul>
        </SettingCard>
    )
}
