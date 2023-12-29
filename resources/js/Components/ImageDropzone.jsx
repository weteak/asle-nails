import { imagePathFormat , returnImage } from '@/Utils/helpers';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageDropzone({ profileImage, setProfileImage, isUpdate, keyObj }) {
    const [giveAccess, setAccess] = useState(isUpdate);

    const onDrop = (acceptedFiles) => {
        setAccess(false);
        const file = acceptedFiles[0];
        setProfileImage(keyObj, file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="mt-4 p-12 border-2 bg-violet-600 bg-opacity-5 border-dashed border-indigo-400 rounded-md text-center">
            <input {...getInputProps()} />
            {profileImage ? (
                <div>
                    <img
                        src={giveAccess ? returnImage(imagePathFormat(profileImage)) : (profileImage instanceof File ? URL.createObjectURL(profileImage) : '')}
                        alt="Profile Preview"
                        className="w-fit rounded-md  h-32 object-center mx-auto object-cover  mb-4"
                    />
                </div>
            ) : (
                <p className="select-none  text-gray-500">Drag & drop an image here, or  <span className='text-indigo-500 cursor-pointer font-bold'>click</span>  to select one</p>
            )}

        </div>
    );
}
