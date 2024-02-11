import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="layout">
            <div className="container d-flex flex-column">
                <div className="row align-items-center justify-content-center no-gutters min-vh-100">
                    <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                        {children}
                    </div>
                </div>
            </div>
        </div>
)
    ;
}
