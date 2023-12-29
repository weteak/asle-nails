import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Confetti from 'react-dom-confetti';
import { useState } from 'react';
import { useForm , router } from '@inertiajs/react';
import { motion } from 'framer-motion';


export default function GainPoints({ auth, token, card_data }) {
    const isSuperAdmin = auth?.user?.role === 'super-admin' && card_data !== null;
    const [isConfettiVisible, setConfettiVisibility] = useState(false);
    const [openModalSuccess, setOpenModalSuccess] = useState(false);
    const [pointsToAdd, setPoints] = useState(5);
    const { post } = useForm();


    const handleGainPoints = (points) => {
        setConfettiVisibility(true);
        setPoints(points);
        post(route('cards.gains', { token: token, points: points }));
        setTimeout(() => {
            setOpenModalSuccess(true);
        }, 500);

        setTimeout(() => {
            setConfettiVisibility(false);
            router.visit('/admin/asle-cards');
            setOpenModalSuccess(false);
        }, 2000);
    };



    return (
        <div>
            {isSuperAdmin ? (
                <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cards Subscriptions</h2>}
                >
                    <Head title="Asle Cards" />
                    <div className="max-w-5xl md:px-0 z-50 px-4 mx-auto py-6">
                        <Confetti active={isConfettiVisible} config={{ spread: 820, elementCount: 400 }} />
                        <div className='absolute flex gap-3 flex-col md:left-1/2 left-0 right-0 mt-2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2'>
                            <div className=' bg-blue-500 bg-opacity-10 p-8 md:rounded-md border-slate-600 border-opacity-50 shadow-sm  '>
                                <h1 className="text-4xl w-full">
                                    Boost <span className="text-4xl font-bold text-indigo-600">{card_data.client_name}</span> by +5 Points
                                </h1>
                                <button onClick={() => handleGainPoints(5)}
                                    className='w-full mt-6 hover:bg-opacity-85 rounded-md text-white bg-opacity-90 bg-indigo-600 py-3'>Gain points</button>
                            </div>
                            <div className=' bg-green-500 bg-opacity-10 p-8 md:rounded-md border-slate-600 border-opacity-50 shadow-sm  '>
                                <h1 className="text-4xl w-full">
                                    Boost <span className="text-4xl font-bold text-green-700">{card_data.client_name}</span> by +10 Points
                                </h1>
                                <button onClick={() => handleGainPoints(10)}
                                    className='w-full mt-6 hover:bg-opacity-85 rounded-md text-white bg-opacity-90 bg-green-700 py-3'>Gain points</button>
                            </div>
                            <div className=' bg-orange-500 bg-opacity-10 p-8 md:rounded-md border-slate-600 border-opacity-50 shadow-sm  '>
                                <h1 className="text-4xl w-full">
                                    Boost <span className="text-4xl font-bold text-orange-700">{card_data.client_name}</span> by +30 Points
                                </h1>
                                <button onClick={() => handleGainPoints(30)}
                                    className='w-full mt-6 hover:bg-opacity-85 rounded-md text-white bg-opacity-90 bg-orange-700 py-3'>Gain points</button>
                            </div>
                        </div>

                        {openModalSuccess && <div
                            className='absolute w-full bg-white   bg-opacity-90 left-0 h-screen top-0'>
                            <motion.div initial={{ opacity: 0, y: '5%' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: '5%' }}
                                transition={{ duration: 0.35, ease: 'easeInOut' }} className='absolute left-12 font-bold text-xl right-12 top-1/3 bg-white p-3 border border-slate-500  -translate-y-1/2'>
                                <span className='bg-blue-500 px-2 py-1 rounded-md bg-opacity-10 text-blue-600'>+{pointsToAdd} points</span> Boosted succesfully to <span className='text-2xl bg-teal-400 bg-opacity-10 px-2 text-indigo-500'>{card_data.client_name}</span>.</motion.div>
                        </div>}
                    </div>
                </AuthenticatedLayout>
            ) : (
                <h1>Not allowed to access</h1>
            )}
        </div>
    );
}
