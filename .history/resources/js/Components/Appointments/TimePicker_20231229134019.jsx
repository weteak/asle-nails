import { useEffect, useState } from "react";
import axios from 'axios';


axios.defaults.withCredentials = true;
export default function TimePicker({ busyTimes, setSelectedTime,
    selectedTime, staffId, selectedDate }) {

    const [times, setTimes] = useState({});

    useEffect(() => {
        const getHours = async () => {
            try {
                const creditInfo = {
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

    const generateTimeSlots = () => {
        let slots = [];
        for (const [hour, count] of Object.entries(times)) {
            for (let i = 0; i < count; i++) {
                let formattedHour = `${hour.padStart(2, '0')}:00`;
                
                slots.push(formattedHour);
            }
        }
        return slots;
    };

    const slots = generateTimeSlots();
    return slots.map(slot => (
        <button
            key={slot}
            type="button"
            onClick={() => { !busyTimes.includes(slot) && setSelectedTime(slot); scroll() }}
            className={`w-full p-2 border rounded-md ${slot === selectedTime ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${busyTimes.includes(slot) ? 'bg-gray-400 bg-opacity-20 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
            disabled={busyTimes.includes(slot)}
        >
            {slot} {parseInt(slot) < 12 ? 'am' : 'pm'}
        </button>
    ));
}