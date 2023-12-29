import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import ImageDropzone from '@/Components/ImageDropzone';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useEffect, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import { Inertia } from '@inertiajs/inertia';
import SecondaryButton from '@/Components/SecondaryButton';


export default function ServiceAction({ closeModal, action, information }) {

    const [checkErrors, setCheckErrors] = useState(false);
    const [deleteMode, setDelete] = useState(false);
    const isUpdate = action === 'update';

    const { data, setData, post, processing, errors, reset } = useForm({
        service_name: isUpdate ? information.service_name : '',
        price: isUpdate ? information.price : '',
        image: isUpdate ? information.image : null,
        duration : isUpdate ? information.duration : '',
        points_value : isUpdate ? information.points_value : ''
    });

    const submit = (e) => {
        e.preventDefault();
        const submitRoute = action === 'update' ?
            route('services.update', { serviceId: information.id }) : route('services.store');
        post(submitRoute);
        setCheckErrors(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        Inertia.delete(route('services.destroy', { id: information.id }))
            .then(() => {
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                reset();
                closeModal();
            });
    };


    useEffect(() => {
        if (checkErrors && !Object.keys(errors).length) {
            closeModal();
            reset();
        }
    }, [checkErrors, errors]);

    return <>
        <> <form onSubmit={submit} encType="multipart/form-data" className=' flex flex-col gap-2'>
            <div className=" flex w-full mx-auto py-4 border-b ">
                <h1 className='text-lg mx-auto text-blue-700 rounded-md  w-fit bg-blue-500 bg-opacity-10 px-4 py-1 text-center font-medium'>{action === 'update' ? 'Edit staff' : 'Add new staff'} </h1>
            </div>

            <div className='w-full grid grid-cols-1'>
                <div className='flex px-4 flex-col gap-2'>
                <div className='mt-2 grid grid-cols-2 gap-4'>
                    <div className="mt-2">

                        <InputLabel htmlFor="service_name" value="Service name" />
                        <TextInput
                            id="service_name"
                            type="text"
                            name="service_name"
                            value={data.service_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('service_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.service_name} className="mt-2" />

                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="price" value="Price" />
                        <TextInput
                            id="price"
                            type="number"
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('price', e.target.value)} required
                        />
                        <InputError message={errors.price} className="mt-2" />

                    </div>
                    </div>
                    <div className='mt-2 grid grid-cols-2 gap-4'>
                    <div className="mt-2">
                        <InputLabel htmlFor="duration" value="Duration Time" />
                        <TextInput
                            id="duration"
                            type="number"
                            name="duration"
                            value={data.duration}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('duration', e.target.value)} required
                        />
                        <InputError message={errors.duration} className="mt-2" />

                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="points_value" value="Points value" />
                        <TextInput
                            id="points_value"
                            type="number"
                            name="points_value"
                            value={data.points_value}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('points_value', e.target.value)} required
                        />
                        <InputError message={errors.points_value} className="mt-2" />

                    </div>
                    </div>
                  
                </div>

            </div>
            <div className='px-4 mb-4'>
                <InputError message={errors.image} className="mt-2" />
                <ImageDropzone profileImage={data.image} setProfileImage={setData} isUpdate={isUpdate} keyObj={`image`} />
                <div className={`grid gap-2  ${isUpdate && 'grid-cols-2'}`}>
                    <PrimaryButton className=" text-center w-full mt-2 py-2 bg-indigo-500" disabled={processing}>
                        <span className='text-center py-1 w-fit mx-auto'>{isUpdate ? 'Update' : 'Create'} </span>
                    </PrimaryButton>
                    {isUpdate && <div onClick={() => setDelete(true)} className="cursor-pointer hover:bg-red-700 animation-all duration-200 hover:bg-opacity-15 font-semibold text-sm uppercase rounded-md text-center w-full mt-2 py-2 bg-red-500 bg-opacity-10 " disabled={processing}>
                        <span className='text-center py-1 w-fit flex gap-1 text-red-600 mx-auto'> <svg className='my-auto' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>Remove </span>
                    </div>}
                </div>
            </div>
        </form>
            <Modal show={deleteMode} maxWidth='lg' onClose={setDelete}>
                <form onSubmit={deleteUser} className="p-6 z-50">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this account from staff?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter account password to confirm you would like to permanently delete the account.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete 
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    </>
}