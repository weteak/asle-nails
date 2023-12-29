
import { Link } from "@inertiajs/react"
import { returnImage , imagePathFormat } from "@/Utils/helpers";
export default function SingleAppointment({auth,appointment}){

    
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};
const formatTime = (time) => {
    const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' };
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('de-DE', options);
};

     return <div>
        <div className="w-full sticky top-0 z-50 h-14 bg-white flex border-b">
            <Link href={route('dashboard')} ><span className="absolute top-1/2 -translate-y-1/2 left-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></span>
            </Link>
            <span className="mx-auto my-auto font-semibold text-xl w-fit">Appointment</span>
        </div>
        <div className="m-4">
        <div className="p-4 relative border-b flex items-center">
            <img className="w-10 h-10 rounded-full" src={returnImage(imagePathFormat(appointment.service.image))} alt={`${appointment.service.service_name}`} />
            <div className="flex my-auto flex-col ml-4">
                <span className="font-semibold text-lg">{appointment.service.service_name}</span>
                <span className='text-xs font-medium '>Staff - {appointment.staff.name}.</span>
                <span className="text-xs  bg-blue-500 flex mt-1.5 gap-1 bg-opacity-5 py-1 text-blue-700 w-fit px-2 rounded-md bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="currentColor" className="bi text-blue-800 my-auto bi-clock" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                    </svg>
                    {appointment.service.duration} min</span>
            </div>
            <div className="ml-auto top-1/2 -translate-y-1/2 flex text-right flex-col absolute right-5">
                <span className="text-sm">{formatDate(appointment.appointment_date)}</span>
                <span className="text-sm py-1">{formatTime(appointment.appointment_time)}</span>
                {appointment.points_used == true && <span className='text-xs flex gap-1 font-bold text-blue-600'>Paid with AsleCard</span>}
            </div>
        </div>
        <div></div>
        <img className="w-40 object-cover rounded-full mt-5 h-40" src={returnImage(imagePathFormat(appointment.staff.profile_image))} alt={`${appointment.staff.profile_image}`}/>
        
        </div>
     </div>
}