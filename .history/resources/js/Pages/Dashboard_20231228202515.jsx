import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { returnImage, imagePathFormat } from '@/Utils/helpers';

export default function Dashboard({ auth, appointments }) {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };
    const formatTime = (time) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(`1970-01-01T${time}Z`).toLocaleTimeString('en-US', options);
    };


  
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-5xl bg-white rounded-md p-4 mx-auto shadow-lg">
                    <div className="mt-2 space-y-4">
                        {appointments.length > 0 &&
                            appointments.map((val, key) => (
                                <div key={`val-${key}`} className="p-4 rounded-lg border flex items-center">
                                    <img className="w-10 h-10 rounded-full" src={returnImage(imagePathFormat(val.service.image))} alt={val.service.service_name} />
                                    <div className="flex flex-col ml-4">
                                        <span className="font-semibold text-lg">{val.service.service_name}</span>
                                        <span className="text-sm">{val.service.duration} min</span>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <span className="text-sm">{formatDate(val.appointment_date)}</span>
                                        <span className="text-sm">{formatTime(val.appointment_time}</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>  );
}