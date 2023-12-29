
import { Link } from "@inertiajs/react"
import { returnImage, imagePathFormat } from "@/Utils/helpers";
export default function SingleAppointment({ auth, appointment }) {


    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };
    const formatTime = (time) => {
        const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' };
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('de-DE', options);
    };

    function callPhoneNumber(phoneNumber) {
        window.open(`tel:${phoneNumber}`);
    }

    return <div>
        <div className="w-full sticky top-0 z-50 h-14 bg-white flex border-b">
            <Link href={route('dashboard')} ><span className="absolute top-1/2 -translate-y-1/2 left-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></span>
            </Link>
            <span className="mx-auto my-auto font-semibold text-xl w-fit">Appointment</span>
        </div>
        <div className="mt-4">
            <div className="px-6 py-5 relative border-b flex items-center">
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
            <div className='w-full flex gap-2'>
        <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
        <h1 className='text-xl whitespace-nowrap bg-blue-500 bg-opacity-5  my-auto  w-fit py-2 px-4 rounded-md font-bold'>
            Your <span className='text-blue-600'>Appointments</span>
        </h1>
        <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
    </div>
            <div className="container mx-auto  border-y py-2 my-3">
                <div className="s bg-white">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover mr-4" src={returnImage(imagePathFormat(appointment.staff.profile_image))} alt={`${appointment.staff.profile_image}`} />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{appointment.staff.name}</h2>
                                    <p className="text-sm text-gray-600">+355{appointment.staff.phone_number}</p>
                                </div>
                            </div>
                            <button onClick={() => callPhoneNumber(appointment.staff.phone_number)} className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telephone mr-2" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                                Call
                            </button>
                        </div>
                    </div>
                    <div className="px-6 py-4 ">
                        <button className="w-full mb-2 py-3.5 bg-blue-600 hover:bg-opacity-80 bg-opacity-90 text-white font-bold  px-4 rounded-md">Edit Appointment</button>
                        <button className="w-full bg-red-600 border border-red-400 border-opacity-40 bg-opacity-10 hover:bg-opacity-20 text-red-600 font-bold py-3.5 px-4 rounded-md">Cancel Appointment</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}