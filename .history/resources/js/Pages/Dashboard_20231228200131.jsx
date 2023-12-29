import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Dashboard({ auth, appointments }) {
    const url = window.location.href;
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-5xl bg-white rounded-md p-4 mx-auto ">
                    <div className='mt-2'>
                        {appointments.}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
