import React, { useState, useRef, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import useScrollLock from '@/Hooks/useScrollLock';
import UsePoints from '../usePoints';
import CalendarPicker from '../CalendarPicker';
import TimePicker from '../TimePicker';
import { scrollSmoothly, scrollToView } from '@/Utils/helpers';

export default function ChooseAppointments({
    edit = false,
    selDate = new Date(),
    selTime = '',
    user,
    serviceSelected,
    staffSelected }) {

    const [selectedDate, setSelectedDate] = useState(selDate);
    const [selectedTime, setSelectedTime] = useState(selTime);
    const [loading, setLoading] = useState(true);
    const goToButton = useRef();
    const [showModal, setShowModal] = useState(false);
    const busyTimes = [];

    console.log(selectedDate)


    useScrollLock(showModal, setShowModal);

    const handleMonthChange = (delta) => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.asle_card && user.asle_card.points >= 50) {
            setShowModal(true);
        } else {
            bookAppointment();
        }
    };

    const formatedDate = selectedDate.toLocaleDateString('en-AL').split('/');

    const bookAppointment = (usePoints = false) => {
        
        const appointmentData = {
            service_id: serviceSelected.id,
            appointment_date: `${formatedDate[formatedDate.length - 1]}-${formatedDate[1]}-${formatedDate[0]}`,
            appointment_time: selectedTime,
            staff_id: staffSelected.id,
            use_points: usePoints,
        };
        if(edit)
        {
            Inertia.post('/update-appointment', {
                appointment_id: '',
                service_id : '',
                appointment_date : '',
                appointment_time: '',
                use_points : ''
            });

        }
        else {
            Inertia.post('/create-appointment', appointmentData);
        }

    };

    const handleUsePoints = (action) => {
        bookAppointment(action);
    };

    return <> <form onSubmit={handleSubmit} className="space-y-4 px-5 mt-6">
        <div>
            <div className="flex justify-between  items-center mb-2">
                <button type="button" className='font-bold text-lg' onClick={() => handleMonthChange(-1)}>&lt;</button>
                <span>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</span>
                <button type="button" className='font-bold text-lg' onClick={() => handleMonthChange(1)}>&gt;</button>
            </div>
            <div className={`sticky  ${edit ? 'top-12' : 'top-16'}  pt-4 w-full  bg-white py-2  flex gap-1 `}>
                <span>{serviceSelected.service_name} <span className='ml-2 px-2 bg-blue-500 bg-opacity-5  py-1 font-bold rounded-lg text-blue-600'>{selectedDate.toLocaleString('default', { day: 'numeric' }) + ' ' + selectedDate.toLocaleString('default', { month: 'short' })}  {selectedTime && `- ${selectedTime}`}</span>   <span className='ml-2'>me {staffSelected.name}.</span> </span>
            </div>
            <div onClick={() => scrollSmoothly(250)} className="grid grid-cols-7 mt-4 gap-2 mb-4">
                <CalendarPicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
            <div ref={goToButton} onClick={() => scrollToView(goToButton)} className="flex flex-wrap gap-2">
                <TimePicker
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    busyTimes={busyTimes}
                    staffId={staffSelected.id}
                    selectedDate={selectedDate}
                    userId={user.id}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </div>
        {!loading && <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Book Appointment</button>}
    </form>
        <UsePoints showModal={showModal} setShowModal={setShowModal} handleUsePoints={handleUsePoints} points={user.asle_card.points} points_value={serviceSelected.points_value} />
    </>
}