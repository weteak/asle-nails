import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { returnImage, imagePathFormat } from '@/Utils/helpers';

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};
const formatTime = (time) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(`1970-01-01T${time}Z`).toLocaleTimeString('en-US', options);
};


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
        <div className="ml-auto flex text-right flex-col absolute right-5">
            <span className="text-sm">{formatDate(appointment.appointment_date)}</span>
            <span className="text-sm py-1">{formatTime(appointment.appointment_time)}</span>
            <span className='text-indigo-700 absolute right-0 -mt-4 text-opacity-80 rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-postcard-heart" viewBox="0 0 16 16">
                    <path d="M8 4.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622M2.5 5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                    <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
                </svg></span>
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
                        <div className='mt-1'></div>
                        {appointments.length > 0 &&
                            appointments.map((appointment, index) => (
                                <AppointmentItem key={`appointment-${index}`} appointment={appointment} />
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}