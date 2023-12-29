import { Link, useForm } from "@inertiajs/react"
import { useEffect } from "react";
import moment from "moment";
import { motion } from "framer-motion";


export default function Notifications({ auth, notifications }) {

    const { post } = useForm();
    const hasNotifications = notifications.length > 0;

    useSc

    const readAll = () => post(route('notifications.read'));
    const clearAll = () => post(route('notifications.clear'));

    function convertDateFormat(dateString) {
        const currentDate = moment();
        const givenDate = moment(dateString);
        const duration = moment.duration(currentDate.diff(givenDate));

        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        if (days >= 1) {
            return formatTime(days, 'd');
        } else if (hours >= 1) {
            return formatTime(hours, 'h');
        } else if (minutes > 0) {
            return formatTime(minutes, 'm');
        } else {
            return 'now';
        }
    }

    function formatTime(value, unit) {
        return `${Math.floor(value)}${unit}`;
    }


    useEffect(() => {
        if (auth.user && auth.user.notification_unread > 0) {
            readAll();
        }
    }, []);

    return <div>
        <div className="w-full sticky top-0 z-50 h-14 bg-white flex border-b">
            <Link href={route('dashboard')} ><span className="absolute top-1/2 -translate-y-1/2 left-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></span>
            </Link>
            <span className="mx-auto my-auto font-semibold text-xl w-fit">Notifications</span>
            {hasNotifications && <span onClick={() => clearAll()} className="absolute items-center right-3 bg-blue-500 bg-opacity-10 text-blue-600 font-medium px-1.5 py-0.5 rounded-md top-1/2 -translate-y-1/2">clear all</span>}
        </div>
        <div className="flex bg-opacity-10  w-full flex-col gap-0">
            {hasNotifications && notifications.map((val, key) => {
                return <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }} key={`notification-key`} className={`p-3 rounded-md ${auth.user.notification_unread === 0 ? 'bg-blue-400' : auth.user.notification_unread > key ? 'bg-blue-500' : 'bg-white'} 
                 bg-opacity-10 relative border-slate-400 border-b border-opacity-15  flex gap-2.5`}>
                    <span className="my-auto text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                    </svg></span>
                    <span className="font-medium">{val.message} <span style={{ fontSize: '11px' }} className=" text-slate-600 ml-0.5 rounded-sm bg-opacity-90  border-slate-500 ">{convertDateFormat(val.created_at)}</span></span>
                </motion.div>
            })}
        </div>
    </div>
}