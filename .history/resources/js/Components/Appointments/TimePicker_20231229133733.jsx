import { useEffect, useState } from "react";
import axios from 'axios';


axios.defaults.withCredentials = true;
export default function TimePicker({ busyTimes, setSelectedTime,
    selectedTime, staffId, selectedDate }) {

    const [times, setTimes] = useState([]);

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


    console.log(times)

    const generateTimeSlots = (start, end) => {
        const slots = [];
        for (let hour = start; hour <= end; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return slots;
    };
    const slots = generateTimeSlots(10, 20);
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