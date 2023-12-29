import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { returnImage, imagePathFormat } from '@/Utils/helpers';

export default function Dashboard({ auth, appointments }) {
 
    const AppointmentHeader = () => (
        <div className='w-full flex gap-2'>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
            <h1 className='text-xl whitespace-nowrap bg-blue-500 bg-opacity-5  my-auto  w-fit py-2 px-4 rounded-md font-bold'>
                Your <span className='text-blue-600'>Appointments</span>
            </h1>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
        </div>
    );

     const AppointmentItem = ({ appointment }) => (
        <div className="p-4 relative border-b flex items-center">
            <img className="w-10 h-10 rounded-full" src={returnImage(imagePathFormat(appointment.service.image))} alt={`${appointment.service.service_name}`} />
            <div className="flex flex-col ml-4">
                <span className="font-semibold text-lg">{appointment.service.service_name}</span>
                <span className="text-sm">{appointment.service.duration} min</span>
            </div>
            <div className="ml-auto flex text-right flex-col absolute right-4">
                <span className="text-sm">{formatDate(appointment.appointment_date)}</span>
                <span className="text-sm py-1">{formatTime(appointment.appointment_time)}</span>
            </div>
        </div>
    );


export default function Dashboard({ auth, appointments }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-5xl bg-white mx-auto">
                    <div className="mt-2">
                        <AppointmentHeader />
                        {appointments.length > 0 &&
                            appointments.map((appointment, index) => (
                                <Appoi key={`appointment-${index}`} appointment={appointment} />
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}