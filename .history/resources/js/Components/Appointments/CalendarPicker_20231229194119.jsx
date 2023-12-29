
export default function CalendarPicker({ selectedDate, setSelectedDate }) {

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const days = daysInMonth(year, month);
    const today = new Date();
    const isToday = (date) => today.toDateString() === date.toDateString();

    return [...Array(days)].map((_, index) => {
        const dayDate = new Date(year, month, index + 1);
        const isPast = dayDate < today && !isToday(dayDate);

        alert(selectedDate);

        return (
            <button
                key={index}
                type="button"
                onClick={() => { !isPast && setSelectedDate(dayDate); }}
                disabled={isPast}
                className={`w-10 h-10 rounded-full ${index + 1 === selectedDate.getDate() && !isPast ? 'bg-blue-500 bg-opacity-10 text-blue-600' : 'text-gray-700'} 
                            ${isPast ? 'bg-gray-300 bg-opacity-20 text-gray-200 cursor-not-allowed' : 'hover:bg-blue-300 hover:bg-opacity-20 '}`}
            >
                {index + 1}

            </button>
        );
    });
}