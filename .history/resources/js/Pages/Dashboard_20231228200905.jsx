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
                    <div className='mt-2 flex flex-col gap-2'>
                        {appointments.length > 0 && appointments.map((val, key) => {
                            return <div key={`appointment-${key}`} className='px-2 py-2 rounded-lg border gap-2 flex w-full'>

                                <img className='w-10 h-10 my-auto rounded-full' src={returnImage(imagePathFormat(val.service.image))} />
                                <div className='flex flex-col gap-1'>
                                    <span className='font-semibold'>{val.service.service_name}</span>
                                    <span className='text-sm'>{val.service.duration} min</span>
                                </div>
                            </div>
                        })}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
