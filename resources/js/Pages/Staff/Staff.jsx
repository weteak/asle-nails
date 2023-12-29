import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import Modal from '@/Components/Modal';
import { imagePathFormat, returnImage, scrollToView } from '@/Utils/helpers';
import StaffForm from '@/Components/Staff/Action/create';

export default function Staff({ auth, staffMembers }) {
    const [addStaffOpen, setStaffOpen] = useState(false);
    const [currentActive, setCurrentActive] = useState(0);
    const [actionType, setActionType] = useState('create');
    const [previewImage, setPreviewImage] = useState(false);

    const goTo = useRef();


    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff</h2>}
    >
        <Head title="Staff" />
        <div className="py-6">
            <div className="max-w-5xl md:px-0 px-1 bg-white flex md:flex-row flex-col h-fit  rounded-md  mx-auto ">

                <div className='md:w-[65%] w-full  flex flex-col relative h-full'>
                    <div className='relative px-3 w-full'>
                        <span className='text-lg font-semibold'>Our active staff</span>
                        {staffMembers.length > 0 && <span className='absolute select-none rounded-md font-medium text-indigo-500 top-1/2 -translate-y-1/2 right-3 flex gap-1'>see all
                        </span>}
                    </div>

                    <div className='grid m-3 rounded-md md:grid-cols-3 grid-cols-2 gap-2'>
                        {staffMembers.length > 0 && staffMembers.map((val, key) => {
                            return <div key={`staff-${key}`} onClick={() => { setCurrentActive(key); scrollToView(goTo) }} className={`border cursor-pointer ${currentActive === key ? 'bg-violet-500 border-dashed border-violet-500 bg-opacity-10 shadow-sm' : 'border-slate-500 border-opacity-30'}   rounded-md   h-fit pb-2  relative`}>
                                <img className='h-36 object-cover w-full object-center rounded-t-md ' src={returnImage(imagePathFormat(val.profile_image))} />
                                <div className='relative mt-1'>
                                    <h2 className='px-2'>{val.name}</h2>
                                    <span className='absolute text-sm text-indigo-600 bg-indigo-500 bg-opacity-10 px-2 mt-0.5 rounded-sm right-2 top-0'>Staff</span>
                                </div>
                            </div>
                        })}
                        <div onClick={() => { setStaffOpen(true); setActionType('create') }} className='h-44 animation-all duration-200 cursor-pointer bg-blue-500 hover:bg-opacity-10 bg-opacity-5 rounded-md w-full my-auto  pb-2  relative'>
                            <div className=' bg-opacity-5 text-indigo-600 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  rounded-full w-fit'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={goTo} className='md:w-[35%]  h-full'>
                    {staffMembers.length > 0 &&
                        <div className='m-3 border border-slate-500 border-opacity-40 shadow-md  bg-blue-600 bg-opacity-5 p-2 relative rounded-md flex flex-col gap-2'>
                            <img onClick={() => setPreviewImage(true)} className='h-56 object-cover object-center rounded-md' src={returnImage(imagePathFormat(staffMembers[currentActive].profile_image))} />

                            <div className='flex flex-col gap-2'>
                                <span className='text-lg text-indigo-600 text-opacity-90 font-semibold'>{staffMembers[currentActive].name}</span>
                                <div className='absolute mt-1 right-4 flex gap-2 text-indigo-500'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                        <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                                    </svg>
                                </div>
                                <span className='text-green-800 font-bold flex gap-2 bg-green-600 py-1 w-fit px-3 bg-opacity-5 '>
                                    <span className='my-auto'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-inbound-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z" />
                                    </svg></span>
                                    {staffMembers[currentActive].phone_number}</span>
                                <span className='text-blue-800 font-bold flex gap-2 bg-blue-600 py-1 w-fit px-3 bg-opacity-5 '>
                                    <span className='my-auto'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                                    </svg></span>
                                    {staffMembers[currentActive].email}</span>
                                <div className='w-full relative'>
                                    <span className='mt-2 text-sm py-2'>Joined at 2/3/2023</span>
                                    <span className='absolute right-2 bg-indigo-500 bg-opacity-20 text-indigo-600 px-2 py-1'>Staff</span>

                                </div>
                                <button onClick={() => { setStaffOpen(true); setActionType('update') }} className='bg-indigo-600 hover:bg-opacity-85 animation-all duration-200 text-white py-2.5 mt-4 rounded-md'>Edit</button>
                            </div>
                        </div>}
                </div>

                {previewImage && <div onClick={() => setPreviewImage(false)} className='fixed left-0 w-full h-screen z-50 bg-black top-0 bg-opacity-80'>
                    <span onClick={() => setPreviewImage(false)} className='absolute right-2 top-4 text-white z-50'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg></span>
                    <img className='w-fit h-2/3 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 object-cover' src={returnImage(imagePathFormat(staffMembers[currentActive].profile_image))} />
                </div>}


                <Modal show={addStaffOpen} maxWidth="lg" onClose={() => setStaffOpen(false)}>
                    <StaffForm closeModal={() => setStaffOpen(false)} action={actionType} information={staffMembers.length > 0 && staffMembers[currentActive]} />
                </Modal>
            </div>
        </div>
    </AuthenticatedLayout>
}