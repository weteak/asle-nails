import cardColor from "@/Assets/Images/card.webp"
import ApplicationLogo from '@/Components/ApplicationLogo';
import QRCode from 'qrcode.react';
import { useForm } from '@inertiajs/react';



export default function LoyaltyCard({ client, hidden = false }) {
    const isSubscribed = client.asle_card !== null;

    const url = isSubscribed ? `${window.location.href}/card-gain/${client.asle_card.unique_token}` : window.location.href;

    const { post } = useForm();

    const subscribe = (e) => {
        e.preventDefault();
        if (isSubscribed) {
            post(route('cards.unsubscribe', { id: client.asle_card.id }));
        }
        else post(route('cards.subscribe', { userId: client.id }));
    };

    return <form onSubmit={subscribe} className='  h-fit w-full  rounded-xl bg-gray-200 bg-opacity-10 border-slate-500 border-opacity-20 '>
        <div className='w-full h-48  border-slate-700 border-opacity-40 shadow-sm relative '>
            <img className='rounded-md backdrop-blur-lg blur-xs  w-full  h-full object-cover' src={cardColor} />
            <div className='absolute top-1/2 -translate-y-1/2 left-4 flex flex-col'>
                <h1 className=' gap-2 flex  mt-0  w-fit rounded-md bg-opacity-10 border-opacity-60  backdrop-blur-sm  border-slate-100   pr-2.5 py-1.5   mb-20'>
                    <ApplicationLogo height='h-8' />
                    <span className='my-auto text-white text-sm'>Asle Card</span>
                </h1>
                <h1 className='text-md font-bold    text-white'>{client.client_name}</h1>
                <span className={`text-slate-200 backdrop-blur-lg ${!isSubscribed && 'blur-sm'}   mt-1  text-xs font-bold `}>Joined {isSubscribed && client.asle_card.subscription_joined}</span>
            </div>
            <div className='absolute  h-[98%] w-40 top-1/2   p-2 bg-white bg-opacity-20  rounded-r-md -translate-y-1/2 right-0'>
                <div className={`my-auto absolute z-50 backdrop-blur-lg  ${!isSubscribed && 'blur-sm md:block hidden'}   top-1/2 -translate-y-1/2 right-4`}>
                    <QRCode value={url} size={128} bgColor={'#ffffff'} fgColor={'#000000'} />
                </div>
            </div>
        </div>
        <div className={`grid  ${isSubscribed && !hidden && 'grid-cols-2'} gap-2 w-full`}>

            {!hidden && <button className='w-full text-white relative flex gap-1.5 h-12 px-4 font-bold  rounded-md mt-2 animation-all duration-200 hover:bg-opacity-90 bg-indigo-500 bg-opacity-85'>
                <span className="items-center flex gap-2  absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plugin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 2.898 5.673c-.167-.121-.216-.406-.002-.62l1.8-1.8a3.5 3.5 0 0 0 4.572-.328l1.414-1.415a.5.5 0 0 0 0-.707l-.707-.707 1.559-1.563a.5.5 0 1 0-.708-.706l-1.559 1.562-1.414-1.414 1.56-1.562a.5.5 0 1 0-.707-.706l-1.56 1.56-.707-.706a.5.5 0 0 0-.707 0L5.318 5.975a3.5 3.5 0 0 0-.328 4.571l-1.8 1.8c-.58.58-.62 1.6.121 2.137A8 8 0 1 0 0 8a.5.5 0 0 0 1 0" />
                    </svg> {isSubscribed ? 'Unsubscribe ' : 'Subscribe'}
                </span>

            </button>}

            {isSubscribed &&
                <div className=" mt-2 select-none rounded-md px-4 bg-blue-500 bg-opacity-10 flex gap-1 py-2.5 text-center items-center border-slate-400 border-opacity-40">
                    <span className="flex w-fit mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-orange-500" width="16" height="16" class="bi bi-stars" viewBox="0 0 16 16">
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg>
                        Points <span className="font-bold text-indigo-600 ml-1">{client.asle_card.points}</span></span> </div>}

        </div>
    </form>
}