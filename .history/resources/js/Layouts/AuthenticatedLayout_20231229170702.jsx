import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { menu, userMenu } from '@/Data/data';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';



export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    let superAdmin = user.role === 'super-admin';

    const dataMobile = user.role !== 'user' ? menu : userMenu;

    let grid = user.role === 'user' ? 'grid grid-cols-5' : 'grid grid-cols-6';


    return (
        <div className="min-h-screen ">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto md:px-0  ">
                    <div className="flex justify-between h-16">

                        <div className="flex px-0 md:py-2 md:relative py-0 bg-white z-40 border-b-10 fixed top-0 items-center w-full">
                            <div className='md:block hidden'>
                                <ApplicationLogo />
                            </div>
                            <div className={`pt-2 pb-2  w-full md:hidden  items-center border-b border-slate-500
                             border-opacity-20 ${grid}`}>
                                {dataMobile.map((val, key) => {
                                    return <div key={`menu-${key}`} className={`${route().current(val.route) && 'bg-blue-600 bg-opacity-10 text-blue-600'} hover:bg-blue-500 hover:bg-opacity-5 hover:text-blue-500 animation-all duration-200 mx-auto rounded-full p-3 my-auto w-fit `}>
                                        <Link href={route(val.route)} active={route().current(val.route)}>
                                            <div  >
                                                {val.icon}
                                            </div>
                                        </Link>
                                    </div>
                                })}

                                {user.role === 'user' &&
                                    <div className={`relative hover:bg-blue-500 group hover:bg-opacity-10 hover:text-blue-500 animation-all duration-200  mx-auto rounded-full p-3 w-fit `}>
                                        {user.notification_unread > 0 && <span className='absolute group-hover:bg-transparent  p-1 right-1 z-40 bg-white top-0 font-bold text-indigo-600  rounded-full'>+{user.notification_unread}</span>
                                        }
                                        <Link href={route('notifications.show')}><div className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                                            </svg>
                                        </div>
                                        </Link>
                                    </div>}

                                <div onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className={`relative  hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500 animation-all duration-200  mx-auto rounded-full p-3 w-fit `}>
                                    <div className=''>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {menu.filter((val) => {
                                if (superAdmin) {
                                    return val;
                                }
                                else if (!val.superadmin === superAdmin) {
                                    return val;
                                }
                            }).map((val, key) => {
                                return <div key={`menu-${key}`} className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                    <NavLink href={route(val.route)} active={route().current(val.route)}>
                                        {val.name}
                                    </NavLink>
                                </div>
                            })}

                            <div className="md:block hidden absolute right-0">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                        </div>

                        <AnimatePresence>
                            {showingNavigationDropdown && <>
                                <div className='fixed bg-black z-50 w-full top-0 h-screen left-0'></div>
                                <motion.div initial={{ opacity: 0, x: '20%' }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className='w-fit h-fit  flex flex-col shadow-md  rounded-lg fixed top-16 z-50  border right-7 border-slate-500 border-opacity-20 bg-white'>

                                    <Link href={route('profile.edit')}>  <div className='w-full border-b   font-semibold px-4 py-3 rounded-t-lg text-lg flex gap-2 '>
                                        <span className='my-auto text-blue-500'><svg className='my-auto' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg></span>
                                        {user.name}
                                    </div></Link>


                                    <Link href={route('logout')} method="post" as="button">
                                        <div className='w-full font-semibold   px-4 py-3  rounded-lg text-lg flex gap-2 '>
                                            <span className='my-auto text-red-500'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                            </svg> </span>   Log out
                                        </div></Link>
                                </motion.div></>
                            }</AnimatePresence>
                    </div>
                </div>
            </nav>
            <main className='max-w-5xl mx-auto  '>
                {children}
            </main>
        </div>
    );
}


