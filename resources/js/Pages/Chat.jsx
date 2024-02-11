import { Link, Head } from '@inertiajs/react';

export default function Chat({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <h3>
                Fancy display heading
                <small className="text-body-secondary">With faded secondary text</small>
            </h3>
        </>
    );
}
