import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LoyaltyCard from '@/Components/Cards/LoyaltyCard';
import InvitationWidget from '@/Components/Invitation/InvitationWidget';
import { motion } from 'framer-motion';
import { useState } from 'react';
import FriendsWidget from '@/Components/Invitation/FriendsWidget';
import TransferCredits from '@/Components/Cards/TransferCredits';
import AsleCardSubscribePrompt from './AsleCardSubscriptionProp';

export default function UserLoyalty({ auth, data }) {

    const [openTransfer, setTransferOpen] = useState(null);
    const [choosenUser, setChoosenUser] = useState('');

    if (!data.asle_card) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
            >
                <Head title="Profile" />
                <div className="py-6 h-full bg-blue-500 bg-op backdrop-blur-sm ">
                    <div className="max-w-5xl h-full bg-gray-200 bg-opacity-10 mx-auto">
                        <AsleCardSubscribePrompt /> 
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }



    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
        <Head title="Profile" />

        <div className="md:py-6  py-4">
            <div className="max-w-5xl mx-auto space-y-6">
                <motion.div initial={{ opacity: 0, y: '4%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '4%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }} className='flex md:flex-row flex-col w-full gap-3'>
                    <div className='md:w-[45%] md:p-0 p-2 flex flex-col gap-2'>
                        {auth.user.role === 'user' && data.asle_card && <LoyaltyCard client={data} hidden={true} />}
                    </div>
                    {(data.friends.length > 0 && data.asle_card)  && <FriendsWidget data={data} setTransferOpen={setTransferOpen} setChoosenUser={setChoosenUser} />}

                    {data.asle_card && <InvitationWidget auth={auth} />}
                </motion.div>
            </div>
            {data.asle_card &&  <TransferCredits info={data} openTransfer={openTransfer} setTransferOpen={setTransferOpen} choosenUser={choosenUser} />}

        </div>



    </AuthenticatedLayout>
}