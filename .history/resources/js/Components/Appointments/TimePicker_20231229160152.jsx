import { useEffect, useState } from "react";
import axios from 'axios';
import { resetTimeToMidnight } from "@/Utils/helpers";

axios.defaults.withCredentials = true;
export default function TimePicker({ busyTimes, setSelectedTime, selectedTime, staffId, selectedDate, userId }) {
    const [times, setTimes] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getHours = async () => {
            try {
                setLoading(true);
                const creditInfo = {
                    user_id: userId,
                    staff_id: staffId,
                    appointment_date: selectedDate
                };
                const response = await axios.post('/api/get-hours', creditInfo);
                setTimes(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
            }
        };

        getHours();
    }, [selectedDate]);

    console.log(resetTimeToMidnight(selectedDate));


    const generateTimeSlots = () => {
        let slots = [];
        for (const [hour, count] of Object.entries(times)) {
            let formattedHour = `${parseInt(hour).toString().padStart(2, '0')}:00`;
            slots.push({ hour: formattedHour, slots: count });
        }
        return slots;
    };

    const divCount = 8;
    const divArray = Array.from({ length: divCount }, (_, index) => index + 1);


    const slots = generateTimeSlots();
    return (
        <div className="w-full flex flex-col gap-2">
            {loading ? divArray.map((item, index) => (
                <div className="w-full h-10 bg-gray-500 rounded-md" key={index}>Div {item}</div>
            )) : slots.map((timeSlot, index) => (
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
