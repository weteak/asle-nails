import LoyaltyCard from '@/Components/Cards/LoyaltyCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef, useCallback, useEffect } from 'react';

export default function Cards({ auth, clients }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllClients, setShowAllClients] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 4;
    const loader = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, options);

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [handleObserver]);

    const filteredClients = clients
        .filter((client) =>
            client.client_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, page * limit);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cards Subscriptions</h2>}
        >
            <Head title="Asle Cards" />
            <div className="max-w-5xl mx-auto md:px-0 px-3 py-6">
                <div className='relative'>
                    <div className='md:py-0 py-1  px-3 md:absolute right-0 border border-slate-400 border-opacity-45 flex gap-2  md:w-56 w-full mt-2 rounded-xl md:rounded-md
                    
                     my-auto'>
                        <span className='my-auto text-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </span>
                        <input
                            type='text'
                            placeholder='Search client'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full placeholder:text-slate-600 bg-transparent focus:outline-none py-3 h-full'
                        />
                    </div>

                    <div className='h-fit mx-auto w-fit md:flex hidden p-2 border rounded-full transition-all duration-300 ease-in-out'>
                        <div
                            className={`px-5 select-none cursor-pointer ${showAllClients ? 'bg-blue-600 bg-opacity-10 text-blue-600' : ''} rounded-full py-2 transition-all duration-300 ease-in-out`}
                            onClick={() => setShowAllClients(true)}
                        >
                            All Clients
                        </div>
                        <div
                            className={`px-5 select-none cursor-pointer ${!showAllClients ? 'bg-blue-600 bg-opacity-10 text-blue-600' : ''} rounded-full py-2 transition-all duration-300 ease-in-out`}
                            onClick={() => setShowAllClients(false)}
                        >
                            Subscribed
                        </div>
                    </div>
                </div>

                <div className='w-full grid lg:grid-cols-3 md:mt-6 mt-3 md:grid-cols-2 grid-cols-1 gap-2'>
                    {filteredClients.length > 0 &&
                        filteredClients.map((client, key) => (
                            <div key={`client-${key}`}>
                                <LoyaltyCard client={client} />
                            </div>
                        ))}
                    <div ref={loader} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
