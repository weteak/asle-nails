import useScrollLock from "@/Hooks/useScrollLock";
import { motion } from "framer-motion";
import OrWidget from "../OrWidget";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import InputError from "../InputError";
const TransferCredits = ({ openTransfer, setTransferOpen, info, choosenUser }) => {

    const packetsToShare = [2, 5, 10, 20];
    const [checkErrors, setCheckErrors] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        credit: 0,
    });


    const transfer = async (e) => {
        e.preventDefault();
        post(route('loyalty.transfer', { receiver: choosenUser }));
        setCheckErrors(true);
    };

    useEffect(() => {
        if (checkErrors && !Object.keys(errors).length) {
            setTransferOpen(null);
        }
    }, [checkErrors, errors]);

    useScrollLock(openTransfer !== null);

    const handlePointsChange = (event) => {
        const inputPoints = parseInt(event.target.value, 10) || 0;
        setData('credit', Math.min(inputPoints, info.asle_card.points));
    };

    return openTransfer !== null && (
        <>
            <div onClick={() => setTransferOpen(null)} className='w-full h-screen scrollbar-hide fixed left-0 top-0 bg-white bg-opacity-80 backdrop-blur-sm'></div>
            <motion.form onSubmit={transfer} initial={{ opacity: 0, y: '4%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '4%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }} className='fixed left-4 border border-slate-500 border-opacity-50 shadow-xl rounded-lg right-4 top-[20%] -translate-y-1/2 z-40 bg-white'>
                <h2 className='font-bold px-2 py-3 rounded-md bg-opacity-10 border-b whitespace-nowrap'>
                    Your Credit : <span className='text-orange-600 mx-1'>{info.asle_card.points}</span> points
                </h2>
                <div className='mt-2'>
                    <span className='px-3 font-medium'>Choose credit</span>
                    <div className='grid mt-2 gap-1 m-3 items-center grid-cols-2'>
                        {packetsToShare.filter((val) => val <= info.asle_card.points).map((packet, key) => (
                            <div
                                onClick={() => setData('credit', packet)}
                                key={key}
                                className={`p-3 rounded-md ${packet === data.credit && 'border-2 border-dashed  border-blue-500'} border-2 border-transparent whitespace-nowrap ${key === 1 ? 'bg-green-500' : key === 2 ? 'bg-violet-500' : key === 3 ? 'bg-red-500 ' : 'bg-blue-500'
                                    } bg-opacity-10`}
                            >
                                <span className='text-center flex mx-auto w-fit font-medium'>{packet} Points</span>
                            </div>
                        ))}
                    </div>

                    <OrWidget />

                    <p className="px-4 flex gap-1 mt-2 py-2 mx-auto rounded-sm bg-opacity-5 text-center text-blue-600 font-semibold bg-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi my-auto bi-stars" viewBox="0 0 16 16">
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg> Put your points</p>
                    <div className='px-3 mt-2 py-2'>
                        <input
                            type='number'
                            placeholder={`Your points (up to ${info.asle_card.points})`}
                            max={info.asle_card.points}
                            value={data.credit === 0 ? '' : data.credit}
                            onChange={handlePointsChange}
                            className='w-full focus:bg-blue-500 focus:bg-opacity-10 focus:outline-none px-2 border-slate-500 border-opacity-40 h-10 border'
                        />
                    </div>

                    <InputError message={errors.credit} className="mt-2 mx-3" />

                    <div className='mx-2 mb-3'>
                        <button disabled={processing || data.credit < 1} className={`w-full font-medium ${data.credit < 1 ? '  bg-gray-100 text-slate-600' : 'bg-indigo-600 text-white'} mt-2  hover:bg-opacity-90 animation-all duration-200 py-3 rounded-lg `}>
                            {data.credit < 1 ? `Select points` : `Send ${data.credit} points to ${openTransfer}`}
                        </button>
                    </div>
                </div>
            </motion.form>
        </>
    );
};

export default TransferCredits;
