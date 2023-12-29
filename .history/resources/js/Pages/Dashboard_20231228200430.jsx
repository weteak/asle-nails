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
                        {appointments.length > 0 && appointments.map((val,key)=>{
                            return <div className='p-3 border w-full'>

                                <img src={val.ser}/>

                            </div>
                        })}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
