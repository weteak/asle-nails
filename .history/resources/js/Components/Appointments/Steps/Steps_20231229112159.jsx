import { useState } from "react";
import ChooseAppointments from "./ChooseAppointment"
import ChooseService from "./ChooseService"
import ChooseStaff from "./ChooseStaff";


export default function Steps({ services, user, staff }) {

    const [currentStep, setStep] = useState(0);
    const [serviceSelected, setServiceSelected] = useState(null);
    const [staffSelected, staff] = useState(null);


    const steps = [<ChooseService
        services={services}
        setStep={setStep}
        setServiceSelected={setServiceSelected} />
        ,<ChooseStaff staff={staff}/>, <ChooseAppointments user={user} serviceSelected={serviceSelected} />];

    return <div>
        <div className='w-full flex gap-2'>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
            <h1 className='text-xl whitespace-nowrap bg-blue-500 bg-opacity-5  my-auto  w-fit py-2 px-4 rounded-md font-bold'>{currentStep == 0 ? <span> Choose <span className='text-blue-600'>Service</span></span> : 'Appointment'} </h1>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
        </div>
        <div className='h-1 mt-4 w-full bg-gray-100 rounded-sm'>
            <div className={` ${currentStep == 0 ? 'w-0' : 'w-1/2'}  h-1 rounded-l-sm relative bg-blue-600 bg-opacity-70`}>
            </div>
        </div>
        <div className="mt-4">{steps[currentStep]}</div>
    </div>
}