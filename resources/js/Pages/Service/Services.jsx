import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import Modal from '@/Components/Modal';
import { imagePathFormat, returnImage, scrollToView } from '@/Utils/helpers';
import ServiceAction from '@/Components/Service/Action/action';

export default function Services({ auth, services }) {
    const [addStaffOpen, setStaffOpen] = useState(false);
    const [currentActive, setCurrentActive] = useState(0);
    const [actionType, setActionType] = useState('create');

    const goTo = useRef();

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Services</h2>}
    >
        <Head title="Staff" />
        <div className="py-6 ">
            <div className="max-w-5xl md:px-0 px-1 bg-white flex md:flex-row flex-col h-fit  rounded-md  mx-auto ">

                <div className='md:w-[65%]  flex flex-col relative h-full'>
                    <div className='relative px-3 w-full'>
                        <span className='text-lg font-semibold'>Our services</span>
                        {services.length > 0 && <span className='absolute select-none rounded-md font-medium text-indigo-500 top-1/2 -translate-y-1/2 right-3 flex gap-1'>see all
                        </span>}
                    </div>
                    <div className='grid m-3 rounded-md md:grid-cols-3 grid-cols-2 gap-2'>
                        {services.length > 0 && services.map((val, key) => {
                            return <div key={`staff-${key}`} onClick={() => { setCurrentActive(key); scrollToView(goTo) }} className={`border cursor-pointer ${currentActive === key ? 'bg-violet-500 border-dashed border-violet-500 bg-opacity-10 shadow-sm' : 'border-slate-500 border-opacity-30'}   rounded-md   h-fit pb-2  relative`}>
                                <img className='h-36 object-cover w-full object-center rounded-t-md ' src={returnImage(imagePathFormat(val.image))} />
                                <div className='relative mt-1'>
                                    <h2 className='px-2'>{val.service_name}</h2>
                                </div>
                            </div>
                        })}
                        <div onClick={() => { setStaffOpen(true); setActionType('create') }} className='h-44 animation-all duration-200 cursor-pointer bg-blue-500 hover:bg-opacity-10 bg-opacity-5 rounded-md w-full my-auto  pb-2  relative'>
                            <div className=' bg-opacity-5 text-indigo-600 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  rounded-full w-fit'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={goTo} className='md:w-[35%]  h-full'>
                    {services.length > 0 &&
                        <div className='m-3 border border-slate-500 border-opacity-40 shadow-md  bg-blue-600 bg-opacity-5 p-2 relative rounded-md flex flex-col gap-2'>
                            <img className='h-56 object-cover object-center rounded-md' src={returnImage(imagePathFormat(services[currentActive].image))} />

                            <div className='flex flex-col gap-2'>
                                <span className='text-lg text-indigo-600 text-opacity-90 font-semibold'>{services[currentActive].service_name}</span>

                                <span className='text-green-800 font-bold flex gap-2 bg-green-600 py-1 w-fit px-3 bg-opacity-5 '>
                                    <span className='my-auto'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag" viewBox="0 0 16 16">
                                        <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
                                        <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
                                    </svg></span>
                                    {services[currentActive].price} lekë</span>

                                <button onClick={() => { setStaffOpen(true); setActionType('update') }} className='bg-indigo-600 hover:bg-opacity-85 animation-all duration-200 text-white py-2.5 mt-4 rounded-md'>Edit</button>
                            </div>
                        </div>}
                </div>

                <Modal show={addStaffOpen} maxWidth="sm" onClose={() => setStaffOpen(false)}>
                    <ServiceAction closeModal={() => setStaffOpen(false)} action={actionType} information={services.length > 0 && services[currentActive]} />
                </Modal>
            </div>
        </div>
    </AuthenticatedLayout>

}