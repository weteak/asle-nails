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

export default function StaffForm({ closeModal, action, information }) {
    const [checkErrors, setCheckErrors] = useState(false);
    const [deleteMode, setDelete] = useState(false);

    const isUpdate = action === 'update';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: isUpdate ? information.name : '',
        email: isUpdate ? information.email : '',
        password: isUpdate ? information.password : '',
        phone_number: isUpdate ? information.phone_number : '',
        profile_image: isUpdate ? information.profile_image : null,
    });

    const submit = (e) => {
        e.preventDefault();
        const submitRoute = action === 'update' ?
            route('staff.update', { userId: information.id }) : route('staff.store');
        post(submitRoute);
        setCheckErrors(true);
    };


    const deleteUser = (e) => {
        e.preventDefault();
        Inertia.delete(route('staff.destroy', { id: information.id }))
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

    return <> <form onSubmit={submit} encType="multipart/form-data" className=' flex flex-col gap-2'>
        <div className=" flex w-full mx-auto py-4 border-b ">
            <h1 className='text-lg mx-auto text-blue-700 rounded-md  w-fit bg-blue-500 bg-opacity-10 px-4 py-1 text-center font-medium'>{action === 'update' ? 'Edit staff' : 'Add new staff'} </h1>
        </div>

        <div className='w-full grid grid-cols-2'>
            <div className='flex px-4 flex-col gap-2'>
                <div className="mt-2">

                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />

                </div>
                <div className="mt-2">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)} required
                    />
                    <InputError message={errors.email} className="mt-2" />

                </div>
            </div>
            <div className='flex px-4 flex-col gap-2'>

                <div className="mt-2">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="text"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)} required
                    />
                    <InputError message={errors.password} className="mt-2" />

                </div>
                <div className="mt-2">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />
                    <div className='flex gap-2'>
                        <div className='my-auto text-sm'><span className='font-bold text-green-700'>+</span>355</div>
                        <TextInput
                            id="phone_number"
                            type="text"
                            name="phone_number"
                            value={data.phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('phone_number', e.target.value)} required
                        />
                        <InputError message={errors.phone_number} className="mt-2" />

                    </div>
                </div></div>
        </div>
        <div className='px-4 mb-4'>
            <InputError message={errors.profile_image} className="mt-2" />
            <ImageDropzone profileImage={data.profile_image} setProfileImage={setData} isUpdate={isUpdate} keyObj={`profile_image`} />
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
                        Delete Account
                    </DangerButton>
                </div>
            </form>
        </Modal>
    </>
}