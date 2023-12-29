import { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;
export default function TimePicker({ busyTimes, setSelectedTime, selectedTime, staffId, selectedDate,userId }) {
    const [times, setTimes] = useState({});

    useEffect(() => {
        const getHours = async () => {
            try {
                const creditInfo = {
                    userId:userId,
                    staff_id: staffId,
                    appointment_date: selectedDate
                };
                const response = await axios.post('/api/get-hours', creditInfo);
                setTimes(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getHours();
    }, [selectedDate, staffId]);

    console.log(times);

    const generateTimeSlots = () => {
        let slots = [];
        for (const [hour, count] of Object.entries(times)) {
            let formattedHour = `${parseInt(hour).toString().padStart(2, '0')}:00`;
            slots.push({ hour: formattedHour, slots: count });
        }
        return slots;
    };

    const slots = generateTimeSlots();
    return (
        <div className="w-full flex flex-col gap-2">
            {slots.map((timeSlot, index) => (
                <button
                    key={`${timeSlot.hour}-${index}`}
                    type="button"
                    onClick={() => { !busyTimes.includes(timeSlot.hour) && setSelectedTime(timeSlot.hour); }}
                    className={`w-full p-2 border rounded-md ${timeSlot.hour === selectedTime ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${busyTimes.includes(timeSlot.hour) ? 'bg-gray-400 bg-opacity-20 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
                    disabled={busyTimes.includes(timeSlot.hour)}
                >
                    {timeSlot.hour} - {timeSlot.slots} slots
                </button>
            ))}
        </div>
    );
}
