

export default function FriendsWidget({ data, setTransferOpen, setChoosenUser }) {

    return <div className='m-3  '>
        <div className='w-full flex gap-2'>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
            <h1 className='text-2xl whitespace-nowrap bg-blue-500 bg-opacity-5  my-auto  w-fit py-2 px-4 rounded-md font-bold'>Your <span className='text-indigo-600'>Friends</span></h1>
            <span className='h-[1px] my-auto bg-black bg-opacity-30 w-full'></span>
        </div>
        <div style={{boxShadow:'2px 10px 4px 3px blue'}} className='flex mt-3 border border-slate-500 border-opacity-50    rounded-lg flex-col'>
            {data.friends.length > 0 && data.friends.map((val,key) => {
                return <div key={`friend-${key}`} className={`p-3 ${key !== data.friends.length-1 && 'border-b'} relative`}>
                    <span className='font-semibold flex gap-2 text-slate-700 text-lg'>
                        {val.username}</span>
                    {val.hasCard &&
                        <div className='flex absolute top-1/2 -translate-y-1/2 right-4 gap-4'>
                            {data.asle_card.points > 0 && <span onClick={() => { setTransferOpen(val.username); setChoosenUser(val.user_id) }} className='my-auto font-semibold text-base text-slate-800 bg-blue-500 hover:bg-opacity-20 animation-all duration-200 bg-opacity-10 px-2 py-1 rounded-md'>Transfer</span>}
                            <span className='text-indigo-700 text-opacity-80 rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-postcard-heart" viewBox="0 0 16 16">
                                    <path d="M8 4.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622M2.5 5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                                    <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
                                </svg></span>
                        </div>
                    }
                </div>
            })}
        </div>
    </div>
}