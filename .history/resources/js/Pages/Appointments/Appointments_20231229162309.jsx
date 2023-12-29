import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Steps from '@/Components/Appointments/Steps/Steps';

export default function Appointments({ services,userData,staff}) {

    useScrollToTop();




    return (
        <AuthenticatedLayout
            user={userData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff</h2>}
        >
            <Head title="Staff" />
            <div className="py-4 mx-2">
                <div className="max-w-5xl md:px-0 px-1 bg-white flex md:flex-row flex-col h-fit  rounded-md  mx-auto ">

                    <div className="container mx-auto px-3 py-2">
                       <Steps services={services} user={userData} staff={staff}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
