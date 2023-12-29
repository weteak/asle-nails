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
          {appointment.points_used && <span className='text-xs flex gap-1 font-bold text-blue-600'>Paid with 
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="30" fill="currentColor" class="bi bi-credit-card-2-back" viewBox="0 0 16 16">
            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1" />
        </svg>
          </span>}
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