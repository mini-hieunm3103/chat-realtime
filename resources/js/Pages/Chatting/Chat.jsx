import {Link, Head, usePage} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/Authenticated/AuthenticatedLayout';
export default function Chat({ auth, canLogin, canRegister }) {
    console.log(canLogin)
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
            >
                <h1>Hieu</h1>
            </AuthenticatedLayout>
        </>
    );
}
