
import { Link } from "@inertiajs/react"
export default function SingleAppointment({auth,appointment}){
     return <div>
        <div className="w-full sticky top-0 z-50 h-14 bg-white flex border-b">
            <Link href={route('dashboard')} ><span className="absolute top-1/2 -translate-y-1/2 left-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></span>
            </Link>
            <span className="mx-auto my-auto font-semibold text-xl w-fit">Appointment</span>
        </div>
        <div className="m-4">
            <h1 className="text-3xl font-semibold">{appointment.service.service_name}</h1>
            
        </div>
     </div>
}