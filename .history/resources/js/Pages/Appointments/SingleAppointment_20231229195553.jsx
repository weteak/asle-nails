
import { Link } from "@inertiajs/react"
import { returnImage, imagePathFormat } from "@/Utils/helpers";
import { useState } from "react";
import ChooseAppointments from "@/Components/Appointments/Steps/ChooseAppointment";
import moment from 'moment';
import 'moment-timezone';
export default function SingleAppointment({ appointment , user }) {

    const [openEdit,setOpenEdit]=useState(false);


    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };
    const formatTime = (time) => {
        const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' };
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('de-DE', options);
    };

    function callPhoneNumber(phoneNumber) {
        window.open(`tel:+355${phoneNumber}`);
    }

    function convertToFormattedDate(dateString) {
        // Parse the date string in the given timezone
        const date = moment.tz(dateString, "YYYY-MM-DD", "Europe/Berlin");
    
        // Format the date to the desired format
        return date.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(Central European Standard Time)]');
    }


    return <div>
        <div className="w-full sticky top-0 z-50 h-14 bg-white flex border-b">
            <Link href={route('dashboard')} ><span className="absolute top-1/2 -translate-y-1/2 left-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></span>
            </Link>
            <span className="mx-auto my-auto font-semibold text-xl w-fit">Appointment</span>
        </div>


        {openEdit ? <ChooseAppointments edit={true} selDate={convertDateFormat(appointment.appointment_date)} selTime={formatTime(appointment.appointment_time)} user={user} serviceSelected={appointment.service.id} staffSelected={appointment.staff}/> :
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
            <div className='w-full my-3 flex gap-2'>
                <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
                <h1 className='text-xl whitespace-nowrap bg-blue-500 bg-opacity-5  my-auto  w-fit py-2 px-4 rounded-md font-bold'>
                    Staff <span className='text-blue-600'>member</span>
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
                            <button onClick={() => callPhoneNumber(appointment.staff.phone_number)} className="flex absolute right-5 bg-blue-500 bg-opacity-5 text-blue-600 text-opacity-80 items-right justify-right   font-semibold p-4 rounded-full  ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            <div className='w-full my-3 flex gap-2'>
                <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
                <h1 className='text-xl whitespace-nowrap bg-blue-500 bg-opacity-5  my-auto  w-fit py-2 px-4 rounded-md font-bold'>
                    Action
                </h1>
                <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
            </div>

            <div className="px-6 my-4 border-y py-8 ">
                <button onClick={()=>setOpenEdit(true)} className="w-full mb-2 py-3.5 bg-blue-600 hover:bg-opacity-80 bg-opacity-90 text-white font-bold  px-4 rounded-md">Edit Appointment</button>
                <button className="w-full border  border-slate-600 border-opacity-80 bg-gray-300 bg-opacity-10 hover:bg-opacity-20 text-slate-800 font-bold py-3.5 px-4 rounded-md">Cancel Appointment</button>
            </div>
        </div>}
    </div>
}