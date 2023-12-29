

export default function SingleAppointment(){
     return <div>
        <div className="w-full sticky top-0 z-50 h-14 bg-white flex border-b">
            <Link href={route('dashboard')} ><span className="absolute top-1/2 -translate-y-1/2 left-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></span>
            </Link>
            <span className="mx-auto my-auto font-semibold text-xl w-fit">Notifications</span>
            {hasNotifications && <span onClick={() => clearAll()} className="absolute items-center right-3 bg-blue-500 bg-opacity-10 text-blue-600 font-medium px-1.5 py-0.5 rounded-md top-1/2 -translate-y-1/2">clear all</span>}
        </div>
     </div>
}