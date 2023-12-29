import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { returnImage, imagePathFormat } from '@/Utils/helpers';


export default function Dashboard({ auth, appointments }) {
    const url = window.location.href;
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-5xl bg-white rounded-md p-4 mx-auto ">
                    <div className='mt-2'>
                        {appointments.length > 0 && appointments.map((val, key) => {
                            return <div key={`appointment-${key}`} className='p-3 border w-full'>

                                <img className='w-10 h-10 rounded-full' src={returnImage(imagePathFormat(val.service.image))} />
                       <div>
                            </div>
                        })}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
