import { useState } from "react";
import ChooseAppointments from "./ChooseAppointment"
import ChooseService from "./ChooseService"
import ChooseStaff from "./ChooseStaff";


export default function Steps({ services, user, staff }) {

    const [currentStep, setStep] = useState(0);
    const [serviceSelected, setServiceSelected] = useState(null);
    const [staffSelected, setStaffSelected] = useState(null);


    const steps = [<ChooseService
        services={services}
        setStep={setStep}
        setServiceSelected={setServiceSelected} />
        , <ChooseStaff staff={staff} setStep={setStep} setStaffSelected={setStaffSelected} />
        , <ChooseAppointments user={user} serviceSelected={serviceSelected}  staffSelected={staffSelected}/>];

    return <div>
        <span className="absolute   left-4 mt-[2px] bg-white text-blue-600 p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></span>
        <div className='w-full flex gap-2'>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
            <h1 className='text-xl whitespace-nowrap bg-blue-500 bg-opacity-5  my-auto  w-fit py-2 px-4 rounded-md font-bold'>{currentStep == 0 ? <span> Choose <span className='text-blue-600'>Service</span></span> : currentStep ==1 ? <span> Choose <span className='text-blue-600'>Staff</span></span> : 'Appointment'} </h1>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
        </div>
        <div className='h-1 mt-4 w-full bg-gray-100 rounded-sm'>
            <div className={` ${currentStep == 0 ? 'w-0' : currentStep == 1 ? 'w-[33%]' : 'w-[66%]'}  h-1 rounded-l-sm relative bg-blue-600 bg-opacity-70`}>
            </div>
        </div>
        <div className="mt-4">{steps[currentStep]}</div>
    </div>
}