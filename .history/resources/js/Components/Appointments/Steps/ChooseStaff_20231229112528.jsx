import { returnImage, imagePathFormat } from "@/Utils/helpers"
import { useState } from "react";

export default function ChooseStaff({ staff, setStep, setStaffSelected }) {


    return <div className="mt-4">
        <div className="flex flex-col mt-2 ">
            {staff.map((val, key) => {
                const [isLoaded, setIsLoaded] = useState(false);

                return <div key={`staff-${key}`} className="w-full border-b py-4 border-opacity-10  relative
                 border-slate-600  flex gap-2  ">
                    <img
                        loading="lazy"
                        className={`w-14 rounded-full my-auto h-14 object-cover object-center ${!isLoaded ? 'bg-gray-50 animate-pulse' : ''}`}
                        src={returnImage(imagePathFormat(val.image))}
                        onLoad={() => setIsLoaded(true)}
                    />
                    <div className="ml-2 flex my-auto flex-col gap-0.5" >
                        <span className="font-semibold">{val.name}</span>
                        <span className="text-sm font-medium">{val.phone_number} lekë</span>
                        <span className="text-xs flex  gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="currentColor" className="bi text-blue-800 my-auto bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                            </svg><span className="mt-0.5">{val.duration} min</span></span>

                    </div>
                    <span onClick={() => { setStep(1); setStaffSelected(val) }} className="absolute top-1/2 -translate-y-1/2 right-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        </svg>
                    </span>
                </div>
            })}
        </div>
    </div>
}